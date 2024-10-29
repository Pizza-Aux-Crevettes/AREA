import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register/register.service';
import { switchMap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';
import { TokenService } from '../services/token/token.service';
import { AreaService } from '../services/area/area.service';
import { UtilsService } from '../services/utils/utils.service';
import { LocalStorageService } from '../services/localStorage/localStorage.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    inputName: string = '';
    inputSurname: string = '';
    inputUsername: string = '';
    inputEmail: string = '';
    inputPassword: string = '';

    emptyField: boolean = false;
    alreadyUse: boolean = false;

    constructor(
        private registerService: RegisterService,
        private router: Router,
        private loginService: LoginService,
        private tokenService: TokenService,
        private areaService: AreaService,
        private utilService: UtilsService,
        private localStorage: LocalStorageService
    ) {}

    ngOnInit() {
        if (!localStorage.getItem('userInputIP')) {
            const userInput = window.prompt(
                'Please enter an IP address :',
                'http://localhost:8080'
            );
            if (userInput) {
                localStorage.setItem('userInputIP', userInput);
            } else {
                localStorage.setItem('userInputIP', 'http://localhost:8080');
            }
            this.loginService.API_URL = localStorage.getItem('userInputIP');
            this.tokenService.API_URL = localStorage.getItem('userInputIP');
            this.areaService.API_URL = localStorage.getItem('userInputIP');
            this.utilService.API_URL = localStorage.getItem('userInputIP');
            this.registerService.API_URL = localStorage.getItem('userInputIP');
        }
    }

    onRegister() {
        if (
            this.inputName !== '' &&
            this.inputSurname !== '' &&
            this.inputUsername !== '' &&
            this.inputEmail !== '' &&
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
                        this.router.navigate(['/login']);
                        return this.registerService.setNewUser(this.inputEmail);
                    }),
                    catchError((error) => {
                        this.alreadyUse = true;
                        throw new Error('Error when creating a new user');
                    })
                )
                .subscribe(
                    (res) => {
                        if (!res.ok) {
                            console.error(
                                'Error when setting new user in API database'
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
