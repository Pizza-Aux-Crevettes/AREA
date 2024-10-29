import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { LocalStorageService } from '../services/localStorage/localStorage.service';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { TokenService } from '../services/token/token.service';
import { AreaService } from '../services/area/area.service';
import { UtilsService } from '../services/utils/utils.service';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    inputEmail: string = '';
    inputPassword: string = '';
    invalidField: boolean = false;

    services: string[] = [
        'spotify_token',
        'google_token',
        'twitch_token',
        'discord_token',
        'github_token',
        'spotify_refresh',
        'google_refresh',
        'twitch_refresh',
        'discord_refresh',
    ];

    constructor(
        private loginService: LoginService,
        private tokenService: TokenService,
        private areaService: AreaService,
        private utilService: UtilsService,
        private localStorage: LocalStorageService,
        private router: Router
    ) {
        this.inputEmail = '';
        this.inputPassword = '';
    }

    ngOnInit() {
        if (!localStorage.getItem('userInputIP')) {
            const userInput = window.prompt(
                'Please enter an IP address :',
                environment.api
            );
            if (userInput) {
                localStorage.setItem('userInputIP', userInput);
            } else {
                localStorage.setItem('userInputIP', environment.api);
            }
            this.loginService.API_URL = localStorage.getItem('userInputIP');
            this.tokenService.API_URL = localStorage.getItem('userInputIP');
            this.areaService.API_URL = localStorage.getItem('userInputIP');
            this.utilService.API_URL = localStorage.getItem('userInputIP');
        }
    }

    onLogin() {
        this.loginService
            .login(this.inputEmail, this.inputPassword)
            .pipe(
                catchError((error) => {
                    alert('Email or password is incorrect');
                    this.invalidField = true;
                    return of(null);
                })
            )
            .subscribe((response) => {
                this.localStorage.setItem('token', response.own_token);
                this.tokenService
                    .getUserData(response.own_token)
                    .pipe(
                        catchError((error) => {
                            console.error(error);
                            this.invalidField = true;
                            return of(null);
                        })
                    )
                    .subscribe((res) => {
                        this.localStorage.setItem('email', res.email);
                        this.tokenService
                            .getServicesTokens(res.email)
                            .pipe(
                                catchError((error) => {
                                    console.error(error);
                                    this.invalidField = true;
                                    return of(null);
                                })
                            )
                            .subscribe((res) => {
                                for (let i = 0; i < this.services.length; i++) {
                                    if (res[0][this.services[i]] !== null) {
                                        this.localStorage.setItem(
                                            this.services[i],
                                            res[0][this.services[i]]
                                        );
                                    }
                                }
                                this.router.navigate(['/dashboard']);
                            });
                    });
            });
    }
}
