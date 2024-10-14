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
