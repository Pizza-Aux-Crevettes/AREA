import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/localStorage/localStorage.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

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
        private router: Router
    ) {}

    ngOnInit() {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        let token = '';
        for (let i = 0; i < this.serviceList.length; i++) {
            if (params.get(this.serviceList[i])) {
                token = `${params.get(this.serviceList[i])}`;
                this.localStorage.setItem(this.serviceList[i], token);
            }
        }
    }

    deleteCookies() {
        console.log('test');
        this.localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }

    moveToDashboard() {
        console.log('move to dashboard');
        this.router.navigate(['/dashboard']);
    }

    connectService(service: string) {
        window.location.href = `${environment.api}/${service}/login`;
    }
}
