import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token/token.service';
import { SpotifyService } from 'src/app/services/spotify/spotify.service';
import { WeatherService } from 'src/app/services/weather/weather.service';
import { GmailService } from 'src/app/services/gmail/gmail.service';
import { of, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LocalStorageService } from '../services/localStorage/localStorage.service';
import { Router } from '@angular/router';

interface Area {
    id: number;
    selectedAction: string;
    selectedReaction: string;
    selectedCity?: string;
    buttonText: string;
}
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {
    areas: Area[] = [];

    constructor(
        private tokenService: TokenService,
        private spotifyService: SpotifyService,
        private weatherService: WeatherService,
        private gmailService: GmailService,
        private localStorage: LocalStorageService,
        private router: Router
    ) {
        this.areas = [
            {
                id: 1,
                selectedAction: '',
                selectedReaction: '',
                selectedCity: '',
                buttonText: 'Apply',
            },
            {
                id: 2,
                selectedAction: '',
                selectedReaction: '',
                selectedCity: '',
                buttonText: 'Apply',
            },
            {
                id: 3,
                selectedAction: '',
                selectedReaction: '',
                selectedCity: '',
                buttonText: 'Apply',
            },
        ];
    }
    deleteCookies() {
        console.log('test');
        this.localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }

    moveToService() {
        console.log('move to dashboard');
        this.router.navigate(['/service']);
    }

    addNewArea(): void {
        const newArea: Area = {
            id: this.areas.length + 1,
            selectedAction: '',
            selectedReaction: '',
            selectedCity: '',
            buttonText: 'Apply',
        };
        this.areas.push(newArea);
    }

    cities = [
        { name: 'Paris' },
        { name: 'Marseille' },
        { name: 'Lyon' },
        { name: 'Toulouse' },
        { name: 'Nice' },
        { name: 'Nantes' },
        { name: 'Montpellier' },
        { name: 'Strasbourg' },
        { name: 'Bordeaux' },
        { name: 'Lille' },
    ];

    onSelectAction(event: any, area: Area) {
        area.selectedAction = event.detail.value;
    }

    onSelectReaction(event: any, area: Area) {
        area.selectedReaction = event.detail.value;
    }

    onSelectCity(event: any, area: Area) {
        area.selectedCity = event.detail.value;
    }

    DelArea(id: number) {
        this.areas = this.areas.filter((area) => area.id !== id);
    }

    AddArea() {
        const newArea: Area = {
            id: this.areas.length + 1,
            selectedAction: '',
            selectedReaction: '',
            selectedCity: '',
            buttonText: 'Apply',
        };
        this.areas.push(newArea);
    }

    playPreview(trackId: string, token_spotify: string) {
        this.spotifyService.getTrackPreview(trackId, token_spotify).subscribe(
            (data) => {
                const previewUrl = data.preview_url;

                if (previewUrl) {
                    const audio = new Audio(previewUrl);
                    audio.play();
                } else {
                    console.log('No preview available for this song.');
                }
            },
            (error) => {
                console.error('Error fetching track preview:', error);
            }
        );
    }

    ApplyActions(
        action: string,
        city: string | undefined,
        me: string
    ): Observable<boolean> {
        if (action === 'Weather') {
            return this.weatherService.getServicesWeather(city).pipe(
                map((response) => !!response),
                catchError(() => of(false))
            );
        } else if (action === 'Email') {
            return this.gmailService.getGmailMsg(me).pipe(
                map((response) => !!response),
                catchError(() => of(false))
            );
        } else {
            return of(false);
        }
    }

    ApplyReaction(reaction: string, dest: string) {
        let token_service = '';
        if (reaction === 'Spotify') {
            token_service = `${this.localStorage.getItem('spotify_token')}`;
            if (token_service !== '') {
                this.playPreview('1Fid2jjqsHViMX6xNH70hE', token_service);
            } else {
                console.error('Please connect to spotify');
            }
        } else if (reaction === 'sendEmail') {
            token_service = `${this.localStorage.getItem('google_token')}`;
            if (token_service !== '') {
                this.gmailService
                    .sendEmail(token_service, dest)
                    .subscribe((res) => {});
                this.gmailService
                    .sendEmail(token_service, dest)
                    .subscribe((res) => {});
            } else {
                console.error('Please connect to google');
            }
        }
    }

    ApplyArea(action: string, reaction: string, city: string | undefined) {
        let me = '';
        let token = this.localStorage.getItem('token');
        if (token !== null) {
            this.tokenService.getUserData(token).subscribe((response) => {
                me = response;
            });
        }
        if (this.ApplyActions(action, city, me)) {
            this.ApplyReaction(reaction, 'areaepitech18@gmail.com');
        }
    }
}
