import { Component, OnInit } from "@angular/core";
import { LoginService } from "../services/login/login.service";
import { LocalStorageService } from "../services/localStorage/localStorage.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-login",
    templateUrl: "./login.page.html",
    styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
    inputEmail: string = "";
    inputPassword: string = "";

    constructor(
        private loginService: LoginService,
        private localStorage: LocalStorageService,
        private router: Router
    ) {
        this.inputEmail = "";
        this.inputPassword = "";
    }

    ngOnInit() {}

    onLogin() {
        this.loginService
            .login(this.inputEmail, this.inputPassword)
            .subscribe((response) => {
                if (!response) {
                    console.error("Email or password is incorrect");
                } else {
                    console.log(response);
                    this.localStorage.setItem("token", response.own_token);
                    this.router.navigate(["/dashboard"]);
                }
            });
    }
}
