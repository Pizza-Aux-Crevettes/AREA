import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/localStorage/localStorage.service';
import { environment } from '../../environments/environment';
import { TokenService } from 'src/app/services/token/token.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { IonSelect } from '@ionic/angular';
import { catchError, of } from 'rxjs';
import { Browser } from '@capacitor/browser';
@Component({
    selector: 'app-service',
    templateUrl: './service.page.html',
    styleUrls: ['./service.page.scss'],
})
export class ServicePage implements OnInit, AfterViewInit {
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
        'github_refresh'
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
        private utilsService: UtilsService
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

    loadServices() {
        this.tokenService
            .getServicesTokens(this.localStorage.getItem('email'))
            .pipe(
                catchError((error) => {
                    console.error(error);
                    return of(null);
                })
            )
            .subscribe((res) => {
                for (let i = 0; i < this.services.length; i++) {
                    if (res[0][this.services[i]] !== null) {
                        this.localStorage.setItem(
                            this.services[i],
                            res[0][this.services[i]]
                        );
                    }
                }
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
            });


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
                        if (token && service != 'spotify' && service != 'google') {
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
                        } else {
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
