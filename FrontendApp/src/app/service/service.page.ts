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
    ];

    public spotify_text: string = '';
    public google_text: string = '';
    public x_text: string = '';
    public discord_text: string = '';

    public spotify_status: string = '';
    public google_status: string = '';
    public x_status: string = '';
    public discord_status: string = '';

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

        if (this.localStorage.getItem('spotify_token')) {
            this.spotify_text = 'disconnection of Spotify';
            this.spotify_status = '#3AB700';
        } else {
            this.spotify_text = 'Connect to Spotify';
            this.spotify_status = '8cb3ff';
        }
        if (this.localStorage.getItem('x_token')) {
            this.x_text = 'disconnection of X';
            this.x_status = '#3AB700';
        } else {
            this.x_text = 'Connect to X';
            this.x_status = '8cb3ff';
        }
        if (this.localStorage.getItem('google_token')) {
            this.google_text = 'disconnection of Google';
            this.google_status = '#3AB700';
        } else {
            this.google_text = 'Connect to Google';
            this.google_status = '8cb3ff';
        }
        if (this.localStorage.getItem('discord_token')) {
            this.discord_text = 'disconnection of Discord';
            this.discord_status = '#3AB700';
        } else {
            this.discord_text = 'Connect to Discord';
            this.discord_status = '8cb3ff';
        }

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
                                console.log(response);
                            });
                    });
            }
        }
    }

    deleteCookies() {
        this.localStorage.removeItem('token');
        this.router.navigate(['/']);
    }

    moveToDashboard() {
        this.router.navigate(['/dashboard']);
    }

    connectService(service: string) {
        window.location.href = `${environment.api}/${service}/login`;
    }
}
