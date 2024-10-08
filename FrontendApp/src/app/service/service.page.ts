import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token/token.service';
import { SpotifyService } from 'src/app/services/spotify/spotify.service';
import { RegisterService } from 'src/app/services/register/register.service';
import { WeatherService } from 'src/app/services/weather/weather.service';
import { LocalStorageService } from '../services/localStorage/localStorage.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-service',
    templateUrl: './service.page.html',
    styleUrls: ['./service.page.scss'],
})
export class ServicePage {
    constructor(
        private tokenService: TokenService,
        private spotifyService: SpotifyService,
        private registerService: RegisterService,
        private weatherService: WeatherService,
        private localStorage: LocalStorageService,
        private router: Router
    ) {}

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
        window.location.href = 'http://localhost:8080/' + service + '/login';
    }
}
