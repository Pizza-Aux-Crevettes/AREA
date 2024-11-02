import { Injectable, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, forkJoin, concatMap } from 'rxjs';
import { LocalStorageService } from '../localStorage/localStorage.service';
import { catchError, mergeMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    API_URL = this.localStorage.getItem('userInputIP');

    constructor(
        private localStorage: LocalStorageService,
        private http: HttpClient
    ) {}

    fetchGitHubData(url: string, githubToken: string): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Accept: 'application/vnd.github.v3+json',
            Authorization: `Bearer ${githubToken}`,
        });

        try {
            return this.http.get<any>(url, { headers: headers });
        } catch (error) {
            console.error('Error :', error);
            return of({
                status: 500,
                error: true,
                message: 'Error when fetching github datas',
                data: {},
            });
        }
    }

    getRep(githubOrgs: any[], githubToken: string): Observable<any[]> {
        const orgFetchObservables = githubOrgs.map((org) =>
            this.fetchGitHubData(
                `https://api.github.com/users/${org.login}/repos`,
                githubToken
            )
        );
        return forkJoin(orgFetchObservables).pipe(
            concatMap((orgRepos) => {
                return of(orgRepos.flat());
            }),
            catchError((error) => {
                console.error('Error fetching repositories :', error);
                return of([]);
            })
        );
    }

    getDiscordMe(discordtoken: string): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + discordtoken,
        });
        try {
            return this.http.get<any>(`${this.API_URL}/discord/me`, {
                headers: headers,
            });
        } catch (error) {
            console.error('Error :', error);
            return of({
                status: 500,
                error: true,
                message: 'Error when getting Discord user',
                data: {},
            });
        }
    }

    setUsernameDiscordInDB(
        token: string,
        username: string,
        nbGuilds: number
    ): Observable<any> {
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
                        nbGuilds: nbGuilds,
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
                message: 'Error when set Discord user name in db',
                data: {},
            });
        }
    }

    deleteDiscordInfo(token: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        });
        try {
            return this.http.delete<any>(`${this.API_URL}/discord/username`, {
                headers: headers,
            });
        } catch (error) {
            console.error('Error :', error);
            return of({
                status: 500,
                error: true,
                message: 'Error when delete Discord user informations',
                data: {},
            });
        }
    }
}
