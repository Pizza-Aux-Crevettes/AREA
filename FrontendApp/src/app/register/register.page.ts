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
import { environment } from '../../environments/environment';

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
        private router: Router
    ) {}

    ngOnInit() {
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

    changeURL() {
        const userInput = window.prompt(
            'Please enter an IP address :',
            localStorage.getItem('userInputIP') ? `${localStorage.getItem('userInputIP')}` : environment.api
        );
        if (userInput) {
            localStorage.setItem('userInputIP', userInput);
        }
        this.registerService.API_URL = `${localStorage.getItem('userInputIP')}`;
    }
}
