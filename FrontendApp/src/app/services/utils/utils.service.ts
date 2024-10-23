import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})

export class UtilsService {
    private API_URL = environment.api;
    constructor(private http: HttpClient) {}

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

    setUsernameDiscordInDB(token: string, username: string, nbGuilds: number): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        try {
            return this.http.post<any>(
                `${this.API_URL}/discord/setUsername`,
                JSON.parse(
                    JSON.stringify({
                        token: token,
                        username: username,
                        nbGuilds: nbGuilds
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
}