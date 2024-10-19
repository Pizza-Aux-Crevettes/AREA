import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/localStorage/localStorage.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
    selector: 'app-service',
    templateUrl: './service.page.html',
    styleUrls: ['./service.page.scss'],
})
export class ServicePage implements OnInit {
    serviceList: string[] = [
        'spotify_token',
        'x_token',
        'google_token',
        'discord_token',
        'spotify_refresh',
        'google_refresh',
        'x_refresh',
        'discord_refresh',
    ];

    public spotify_text: string = '';
    public google_text: string = '';
    public x_text: string = '';
    public discord_text: string = '';

    public spotify_status: string = '';
    public google_status: string = '';
    public x_status: string = '';
    public discord_status: string = '';

    public spotify_connect: boolean = false;
    public google_connect: boolean = false;
    public x_connect: boolean = false;
    public discord_connect: boolean = false;

    constructor(
        private localStorage: LocalStorageService,
        private router: Router,
        private tokenService: TokenService
    ) {}

    ngOnInit() {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        let email = '';
        let token = '';

        let userToken = this.localStorage.getItem('token');
        for (let i = 0; i < this.serviceList.length; i++) {
            if (params.get(this.serviceList[i]) && userToken !== null) {
                this.tokenService
                    .getUserData(userToken)
                    .subscribe((response) => {
                        email = response.email;
                        token = `${params.get(this.serviceList[i])}`;
                        this.localStorage.setItem(this.serviceList[i], token);
                        this.tokenService
                            .setTokenInDb(token, email, this.serviceList[i])
                            .subscribe((response) => {
                                this.clearUrl();
                                console.log(response);
                            });
                    });
            }
        }
        if (
            this.localStorage.getItem('spotify_token') &&
            this.localStorage.getItem('spotify_token') !== 'null'
        ) {
            this.spotify_text = 'disconnection of Spotify';
            this.spotify_status = '#3AB700';
            this.spotify_connect = true;
        } else {
            this.spotify_text = 'Connect to Spotify';
            this.spotify_status = '8cb3ff';
            this.spotify_connect = false;
        }
        if (
            this.localStorage.getItem('x_token') &&
            this.localStorage.getItem('x_token') !== 'null'
        ) {
            this.x_text = 'disconnection of X';
            this.x_status = '#3AB700';
            this.x_connect = true;
        } else {
            this.x_text = 'Connect to X';
            this.x_status = '8cb3ff';
            this.x_connect = false;
        }
        if (
            this.localStorage.getItem('google_token') &&
            this.localStorage.getItem('google_token') !== 'null'
        ) {
            this.google_text = 'disconnection of Google';
            this.google_status = '#3AB700';
            this.google_connect = true;
        } else {
            this.google_text = 'Connect to Google';
            this.google_status = '8cb3ff';
            this.google_connect = false;
        }
        if (
            this.localStorage.getItem('discord_token') &&
            this.localStorage.getItem('discord_token') !== 'null'
        ) {
            this.discord_text = 'disconnection of Discord';
            this.discord_status = '#3AB700';
            this.discord_connect = true;
        } else {
            this.discord_text = 'Connect to Discord';
            this.discord_status = '8cb3ff';
            this.discord_connect = false;
        }
    }

    clearUrl() {
        const url = window.location.href.split('?')[0];
        window.history.replaceState({}, document.title, url);
    }

    deleteCookies() {
        this.localStorage.removeItem('token');
        this.router.navigate(['/']);
    }

    moveToDashboard() {
        this.router.navigate(['/dashboard']);
    }

    ManageService(service: string, status: boolean) {
        if (!status) {
            window.location.href = `${environment.api}/${service}/login`;
        } else {
            let userToken = this.localStorage.getItem('token');
            if (userToken) {
                this.tokenService
                    .getUserData(userToken)
                    .subscribe((response) => {
                        const email = response.email;
                        const token = this.localStorage.getItem(
                            service + '_token'
                        );
                        if (token && service != 'spotify') {
                            this.tokenService
                                .revokeToken(service, token)
                                .subscribe(() => {
                                    this.localStorage.removeItem(
                                        service + '_token'
                                    );
                                    this.localStorage.removeItem(
                                        service + '_refresh'
                                    );
                                    this.tokenService
                                        .setTokenInDb(
                                            '',
                                            email,
                                            service + '_token'
                                        )
                                        .subscribe((response) => {
                                            this.tokenService
                                                .setTokenInDb(
                                                    '',
                                                    email,
                                                    service + '_refresh'
                                                )
                                                .subscribe((response) => {
                                                    window.location.reload();
                                                });
                                        });
                                });
                        } else if (token && service === 'spotify') {
                            this.localStorage.removeItem(service + '_token');
                            this.localStorage.removeItem(service + '_refresh');
                            this.tokenService
                                .setTokenInDb('', email, service + '_token')
                                .subscribe((response) => {
                                    this.tokenService
                                        .setTokenInDb(
                                            '',
                                            email,
                                            service + '_refresh'
                                        )
                                        .subscribe((response) => {
                                            window.location.reload();
                                        });
                                });
                        }
                    });
            }
        }
    }
}
