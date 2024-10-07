import { Component, OnInit } from "@angular/core";
import { RegisterService } from "../services/register/register.service";
import { switchMap, catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { Router } from "@angular/router";

@Component({
    selector: "app-register",
    templateUrl: "./register.page.html",
    styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
    inputName: string = "";
    inputSurname: string = "";
    inputUsername: string = "";
    inputEmail: string = "";
    inputPassword: string = "";

    emptyField: boolean = false;
    alreadyUse: boolean = false;

    constructor(
        private registerService: RegisterService,
        private router: Router
    ) {}

    ngOnInit() {}

    onRegister() {
        if (
            this.inputName !== "" &&
            this.inputSurname !== "" &&
            this.inputUsername !== "" &&
            this.inputEmail !== "" &&
            this.inputPassword
        ) {
            this.registerService
                .register(
                    this.inputName,
                    this.inputSurname,
                    this.inputUsername,
                    this.inputEmail,
                    this.inputPassword
                )
                .pipe(
                    switchMap((response) => {
                        this.router.navigate(["/login"]);
                        return this.registerService.setNewUser(this.inputEmail);
                    }),
                    catchError((error) => {
                        this.alreadyUse = true;
                        throw new Error("Error when creating a new user");
                    })
                )
                .subscribe(
                    (res) => {
                        if (!res.ok) {
                            console.error(
                                "Error when setting new user in API database"
                            );
                        }
                    },
                    (error) => {
                        console.error(error.message);
                    }
                );
        } else {
            this.emptyField = true;
        }
    }
}
