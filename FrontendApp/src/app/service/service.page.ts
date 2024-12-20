import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/localStorage/localStorage.service';
import { environment } from '../../environments/environment';
import { TokenService } from 'src/app/services/token/token.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { IonSelect } from '@ionic/angular';
import { ApiService } from '../services/api/api.service';
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

    token: string = '';

    constructor(
        protected localStorage: LocalStorageService,
        private tokenService: TokenService,
        private utilsService: UtilsService,
        private apiService: ApiService
    ) {}

    ngOnInit() {
        this.token = `${this.localStorage.getItem('token')}`;

        this.utilsService.fetchAdaptability(this.token);
        this.utilsService.isDislexicFont$.subscribe((fontState) => {
            this.isDislexicFontEnabled = fontState;
        });
        this.loadServices();
    }

    ngAfterViewInit() {
        this.spotify_connect = Boolean(
            this.localStorage.getItem('spotify_token') === 'true'
        );
        this.twitch_connect = Boolean(
            this.localStorage.getItem('twitch_token') === 'true'
        );
        this.github_connect = Boolean(
            this.localStorage.getItem('github_token') === 'true'
        );
        this.google_connect = Boolean(
            this.localStorage.getItem('google_token') === 'true'
        );
        this.discord_connect = Boolean(
            this.localStorage.getItem('discord_token') === 'true'
        );
    }

    loadServices() {
        this.tokenService.getUserData(this.token).subscribe((res) => {
            let email = res.email;
            this.tokenService.getServicesTokens(email).subscribe((res) => {
                let tokenList = res[0];
                for (let i = 0; i < this.serviceList.length; i++) {
                    if (tokenList[`${this.serviceList[i]}`]) {
                        this.localStorage.setItem(this.serviceList[i], 'true');
                    } else {
                        this.localStorage.setItem(this.serviceList[i], 'false');
                    }
                }
                this.ngAfterViewInit();
                if (tokenList.discord_token) {
                    this.apiService
                        .getDiscordMe(tokenList.discord_token)
                        .subscribe((res) => {
                            this.apiService
                                .setUsernameDiscordInDB(
                                    this.token,
                                    res.userData.username,
                                    res.guildCount
                                )
                                .subscribe((res) => {});
                        });
                }
            });
        });
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
            const api_url = this.localStorage.getItem('userInputIP') ? this.localStorage.getItem('userInputIP') : environment.api;
            await Browser.open({
                url: `${api_url}/${service}/login/${this.localStorage.getItem('email')}`,
            });

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
                        this.localStorage.setItem(service + '_token', 'false');
                        if (service !== 'github') {
                            this.localStorage.setItem(
                                service + '_refresh',
                                'false'
                            );
                        }

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
                        this.apiService
                            .deleteDiscordInfo(this.token)
                            .subscribe((res) => {});
                    });
            }
        }
    }
}
