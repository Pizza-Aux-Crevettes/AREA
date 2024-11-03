import { Injectable, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { TokenService } from 'src/app/services/token/token.service';
import { LocalStorageService } from '../localStorage/localStorage.service';
import { IonSelect } from '@ionic/angular';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ApiService } from '../api/api.service';
import { AreaService } from '../area/area.service';
@Injectable({
    providedIn: 'root',
})
export class UtilsService {
    private isDislexicFontSubject = new BehaviorSubject<boolean>(false);
    isDislexicFont$ = this.isDislexicFontSubject.asObservable();
    @ViewChild('menu', { static: false }) menu!: IonSelect;
    serviceList: string[] = [
        'spotify_token',
        'twitch_token',
        'google_token',
        'discord_token',
        'spotify_refresh',
        'google_refresh',
        'twitch_refresh',
        'discord_refresh',
    ];

    constructor(
        private localStorage: LocalStorageService,
        private router: Router,
        private tokenService: TokenService,
        private apiService: ApiService,
        private areaService: AreaService,
    ) {}

    fetchAdaptability(userToken: string | null) {
        this.tokenService.getAdaptabilityUser(userToken).subscribe(
            (response) => {
                const adaptability = response[0]?.adaptabilityText;
                this.isDislexicFontSubject.next(adaptability);
            },
            (error) => {
                console.error('Error fetching adaptability:', error);
            }
        );
    }


    toggleDislexicFont(userToken: string | null, componentInstance: any) {
        const newFontState = !this.isDislexicFontSubject.value;
        this.isDislexicFontSubject.next(newFontState);
        console.log('Toggled dyslexic font:', newFontState);

        this.tokenService.setAdaptabilityUser(userToken).subscribe(
            (response) => {},
            (error) => {
                console.error('Error updating adaptability:', error);
            }
        );
    }

    deleteCookies(serviceList: string[]) {
        this.localStorage.removeItem('token');
        for (let i = 0; i < serviceList.length; i++) {
            if (this.localStorage.getItem(serviceList[i])) {
                this.localStorage.removeItem(serviceList[i]);
            }
        }
        this.localStorage.removeItem('email');
        this.router.navigate(['/']);
    }

    openMenu(menu: any) {
        if (menu) {
            menu.open();
        } else {
            console.error('Menu not found');
        }
    }

    onSelectNavigate(event: any, componentInstance: any) {
        const selectedValue = event.detail.value;
        if (selectedValue === 'Dashboard') {
            this.router.navigate(['/dashboard']);
        } else if (selectedValue === 'Service') {
            this.router.navigate(['/service']);
        } else if (selectedValue === 'ChangeIPAdress') {
            const userInput = window.prompt(
                'Please enter an IP address :',
                this.localStorage.getItem('userInputIP') ? `${localStorage.getItem('userInputIP')}` : environment.api
            );
            if (userInput) {
                this.localStorage.setItem('userInputIP', userInput);
            }
            this.tokenService.API_URL = `${this.localStorage.getItem('userInputIP')}`;
            this.areaService.API_URL = `${this.localStorage.getItem('userInputIP')}`;
            this.apiService.API_URL = `${this.localStorage.getItem('userInputIP')}`;
        }
    }

    onSelectParam(event: any, componentInstance: any) {
        const selectedValue = event.detail.value;
        if (selectedValue === 'Log out') {
            this.deleteCookies(componentInstance.serviceList);
        } else if (selectedValue === 'Dislexic font') {
            this.toggleDislexicFont(
                localStorage.getItem('token'),
                componentInstance
            );
        }
    }
}
