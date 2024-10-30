import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/localStorage/localStorage.service';
import { environment } from '../../environments/environment';
import { TokenService } from 'src/app/services/token/token.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { IonSelect } from '@ionic/angular';
import { ApiService } from '../services/api/api.service';
import { catchError, of } from 'rxjs';
import { Browser } from '@capacitor/browser';
@Component({
    selector: 'app-service',
    templateUrl: './service.page.html',
    styleUrls: ['./service.page.scss'],
})
export class ServicePage implements OnInit {
    isDislexicFontEnabled?: boolean;
    serviceList: string[] = [
        'spotify_token',
        'twitch_token',
        'google_token',
        'discord_token',
        'github_token',
        'spotify_refresh',
        'google_refresh',
        'twitch_refresh',
        'discord_refresh',
    ];

    public spotify_connect: boolean = false;
    public google_connect: boolean = false;
    public twitch_connect: boolean = false;
    public discord_connect: boolean = false;
    public github_connect: boolean = false;

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
        protected localStorage: LocalStorageService,
        private tokenService: TokenService,
        private utilsService: UtilsService,
        private apiService: ApiService
    ) {}

    ngOnInit() {
        let userToken = this.localStorage.getItem('token');
        const search = window.location.search;
        const params = new URLSearchParams(search);
        let email = '';
        let token = '';

        this.utilsService.fetchAdaptability(userToken);
        this.utilsService.isDislexicFont$.subscribe((fontState) => {
            this.isDislexicFontEnabled = fontState;
        });
        this.loadServices();
    }

    ngAfterViewInit() {
        this.spotify_connect = !!(this.localStorage.getItem('spotify_token') &&
                    this.localStorage.getItem('spotify_token') !== 'null');
                this.twitch_connect = !!(this.localStorage.getItem('twitch_token') &&
                    this.localStorage.getItem('twitch_token') !== 'null');
                this.github_connect = !!(this.localStorage.getItem('github_token') &&
                    this.localStorage.getItem('github_token') !== 'null');
                this.google_connect = !!(this.localStorage.getItem('google_token') &&
                    this.localStorage.getItem('google_token') !== 'null');
                this.discord_connect = !!(this.localStorage.getItem('discord_token') &&
                    this.localStorage.getItem('discord_token') !== 'null');
    }

    loadServices() {
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
                                this.ngAfterViewInit();
                            });
                        const discord_token =
                            this.localStorage.getItem('discord_token');
                        if (discord_token !== null) {
                            this.apiService
                                .getDiscordMe(discord_token)
                                .subscribe((response) => {
                                    const token =
                                        this.localStorage.getItem('token');
                                    if (token !== null) {
                                        this.apiService
                                            .setUsernameDiscordInDB(
                                                token,
                                                response.userData.username,
                                                response.guildCount
                                            )
                                            .subscribe((response) => {
                                                window.location.reload();
                                            });
                                    }
                                });
                        }
                    });
            }
        }
    }

    clearUrl() {
        const url = window.location.href.split('?')[0];
        window.history.replaceState({}, document.title, url);
    }

    toggleDislexicFont() {
        const userToken = this.localStorage.getItem('token');
        this.utilsService.toggleDislexicFont(userToken, this);
    }

    deleteCookies() {
        this.utilsService.deleteCookies(this.serviceList);
    }

    openMenu(menu: IonSelect) {
        this.utilsService.openMenu(menu);
    }

    onSelectNavigate(event: any) {
        this.utilsService.onSelectNavigate(event, this);
    }

    onSelectParam(event: any) {
        this.utilsService.onSelectParam(event, this);
    }

    async ManageService(service: string, status: boolean) {
        if (!status) {
            await Browser.open({url: `${environment.api}/${service}/login/${this.localStorage.getItem('email')}`});

            await Browser.addListener('browserFinished', () => {
                window.location.reload();
            });
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
                        this.localStorage.setItem(service + '_token', 'false');
                        this.localStorage.setItem(
                            service + '_refresh',
                            'false'
                        );
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
                    });
            }
        }
    }
}
