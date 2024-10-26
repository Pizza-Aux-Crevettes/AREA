import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { LocalStorageService } from '../services/localStorage/localStorage.service';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { TokenService } from '../services/token/token.service';

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
        private localStorage: LocalStorageService,
        private router: Router
    ) {
        this.inputEmail = '';
        this.inputPassword = '';
    }

    ngOnInit() {}

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
                                    this.localStorage.setItem(
                                        this.services[i],
                                        res[0][this.services[i]]
                                    );
                                }
                                this.router.navigate(['/dashboard']);
                            });
                    });
            });
    }
}
