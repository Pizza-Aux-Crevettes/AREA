import { Injectable, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TokenService } from 'src/app/services/token/token.service';
import { LocalStorageService } from '../localStorage/localStorage.service';
import { IonSelect } from '@ionic/angular';
import { Router } from '@angular/router';
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
    private API_URL = environment.api;
    constructor(private http: HttpClient,
        private localStorage: LocalStorageService,
        private router: Router,
        private tokenService: TokenService,
    ) {}

    getDiscordMe(Discordtoken: string): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + Discordtoken,
        });
        try {
            return this.http.get<any>(
                `${this.API_URL}/discord/me`,
                {
                    headers: headers,
                }
            );
        } catch (error) {
            console.error('Error :', error);
            return of({
                status: 500,
                error: true,
                message: 'Error',
                data: {},
            });
        }
    }

    setUsernameDiscordInDB(token: string, username: string): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        try {
            return this.http.post<any>(
                `${this.API_URL}/discord/setUsername`,
                JSON.parse(
                    JSON.stringify({
                        token: token,
                        username: username
                    })
                ),
                {
                    headers: headers,
                }
            );
        } catch (error) {
            console.error('Error :', error);
            return of({
                status: 500,
                error: true,
                message: 'Error',
                data: {},
            });
        }
    }

  toggleDislexicFont(userToken: string | null, componentInstance: any) {
    this.tokenService.setAdaptabilityUser(userToken).subscribe(
      (response) => {
        console.log('Updated adaptability response:', response);
      },
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
    this.router.navigate(['/']);
  }

  openMenu(menu: any) {
    if (menu) {
      menu.open();
    } else {
      console.log("Menu not found");
    }
  }

  onSelectNavigate(event: any, componentInstance: any) {
    const selectedValue = event.detail.value;
    if (selectedValue === 'Dashboard') {
      this.router.navigate(['/dashboard']);
    } else if (selectedValue === 'Service') {
      this.router.navigate(['/service']);
    }
  }

  onSelectParam(event: any, componentInstance: any) {
    const selectedValue = event.detail.value;
    if (selectedValue === 'Log out') {
      this.deleteCookies(componentInstance.serviceList);
    } else if (selectedValue === 'Dislexic font') {
      this.toggleDislexicFont(localStorage.getItem('token'), componentInstance);
    }
  }
}