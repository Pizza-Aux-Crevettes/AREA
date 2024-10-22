import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token/token.service';
import { SpotifyService } from 'src/app/services/spotify/spotify.service';
import { WeatherService } from 'src/app/services/weather/weather.service';
import { GmailService } from 'src/app/services/gmail/gmail.service';
import { AreaService } from 'src/app/services/area/area.service';
import { of, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LocalStorageService } from '../services/localStorage/localStorage.service';
import { Router } from '@angular/router';

interface Area {
    id: number;
    action: string;
    reaction: string;
    inputAction: string;
    inputReaction: string;
    userEmail: string;
    local: boolean;
}
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
    providers: [AreaService],
})
export class DashboardPage implements OnInit {
    hoverText: string = '';

    areas: Area[] = [];
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

    cities: any[] = [
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

    cities_alerts = [
        { name: 'Tokyo' },
        { name: 'Jakarta' },
        { name: 'Manille' },
        { name: 'Port-au-Prince' },
        { name: 'Mexico City' },
        { name: 'Los Angeles' },
        { name: 'Calcutta' },
        { name: 'Dhaka' },
        { name: 'Caracas' },
        { name: 'Christchurch' },
    ];

    menuItemsAction = [
        { action: 'Weather', label: 'When it rains', connected: false },
        { action: 'Email', label: 'When I receive an email', connected: false },
        { action: 'Alerts', label: 'When it is alerts', connected: false },
        {
            action: 'DiscordUsername',
            label: 'When my discord username changes',
            connected: false,
        },
    ];

    menuItemsReaction = [
        { reaction: 'Spotify', label: 'Sad music is played', connected: false },
        { reaction: 'sendEmail', label: 'Send an email', connected: false },
        { reaction: 'MP', label: 'Send a mp', connected: false },
        { reaction: 'Clip', label: 'Create a Twitch clip', connected: false },
    ];

    constructor(
        private localStorage: LocalStorageService,
        private router: Router,
        private areaService: AreaService
    ) {}

    ngOnInit() {
        this.areaService
            .getArea(`${this.localStorage.getItem('token')}`)
            .subscribe((res) => {
                console.log(res);
                this.areas = res;
                if (this.areas.length == 0) {
                    this.addNewArea();
                    this.addNewArea();
                }
            });
        this.checkConnection();
    }

    checkServicesConnexion(area: string): boolean {
        switch (area) {
            case 'Email':
                if (!this.localStorage.getItem('google_token')) {
                    return false;
                }
                break;
            case 'DiscordUsername':
                if (!this.localStorage.getItem('discord_token')) {
                    return false;
                }
                break;
            case 'Spotify':
                if (!this.localStorage.getItem('spotify_token')) {
                    return false;
                }
                break;
            case 'sendEmail':
                if (!this.localStorage.getItem('google_token')) {
                    return false;
                }
                break;
            case 'Clip':
                if (!this.localStorage.getItem('twitch_token')) {
                    return false;
                }
                break;
            default:
                return true;
        }
        return true;
    }
    checkConnection() {
        for (let i = 0; i < this.menuItemsAction.length; i++) {
            this.menuItemsAction[i].connected = this.checkServicesConnexion(
                this.menuItemsAction[i].action
            );
        }
        for (let i = 0; i < this.menuItemsReaction.length; i++) {
            this.menuItemsReaction[i].connected = this.checkServicesConnexion(
                this.menuItemsReaction[i].reaction
            );
        }
    }

    deleteCookies() {
        this.localStorage.removeItem('token');
        for (let i = 0; i < this.serviceList.length; i++) {
            if (this.localStorage.getItem(this.serviceList[i])) {
                this.localStorage.removeItem(this.serviceList[i]);
            }
        }
        this.router.navigate(['/']);
    }

    moveToService() {
        this.router.navigate(['/service']);
    }

    addNewArea(): void {
        const newArea: Area = {
            id: this.areas.length,
            action: '',
            reaction: '',
            inputAction: '',
            inputReaction: '',
            userEmail: '',
            local: true,
        };
        this.areas.push(newArea);
    }

    onSelectAction(event: any, area: Area) {
        area.action = event.detail.value;
    }

    onSelectReaction(event: any, area: Area) {
        area.reaction = event.detail.value;
    }

    onSelectCity(event: any, area: Area) {
        area.inputAction = event.detail.value;
    }

    DelArea(id: number) {
        let token = this.localStorage.getItem('token');
        if (token === null) {
            return;
        }
        let body: any;
        for (const area of this.areas) {
            if (area.id === id) {
                body = {
                    action: area.action,
                    reaction: area.reaction,
                    inputAction: area.inputAction,
                    inputReaction: area.inputReaction,
                };
            }
        }
        if (body.action) {
            this.areaService.delArea(token, body).subscribe((_) => {});
        }
        this.areas = this.areas.filter((area) => area.id !== id);
    }

    ApplyArea(
        action: string,
        reaction: string,
        inputAction: string | undefined,
        inputReaction: string | undefined
    ) {
        let token = this.localStorage.getItem('token');
        if (token !== null) {
            this.areaService
                .setArea(token, action, reaction, inputAction, inputReaction)
                .subscribe((response) => {
                    console.log(response);
                });
        }
    }
}
