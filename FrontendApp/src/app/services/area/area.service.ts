import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
    providedIn: 'root',
})
export class AreaService {
    private API_URL = environment.api;
    constructor(private http: HttpClient) {}

    setArea(
        token: string,
        action: string,
        reaction: string,
        inputAct: string | undefined,
        inputReact: string | undefined
    ): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        try {
            return this.http.post<any>(
                `${this.API_URL}/api/setArea`,
                { token, action, reaction, inputAct, inputReact },
                { headers }
            );
        } catch (error) {
            console.error('Error:', error);
            return of({
                status: 500,
                error: true,
                message: 'Error',
                data: {},
            });
        }
    }

    delArea(token: string, body: any) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        try {
            return this.http.post<any>(
                `${this.API_URL}/api/delArea/`,
                {
                    token: token,
                    action: body.action,
                    reaction: body.reaction,
                    inputAct: body.inputAction,
                    inputReact: body.inputReaction,
                },
                {
                    headers,
                }
            );
        } catch (error) {
            console.error('Error:', error);
            return of({
                status: 500,
                error: true,
                message: 'Error',
                data: {},
            });
        }
    }

    getArea(token: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        try {
            return this.http.post<any>(
                `${this.API_URL}/api/getArea`,
                { token },
                { headers }
            );
        } catch (error) {
            console.error('Error:', error);
            return of({
                status: 500,
                error: true,
                message: 'Error',
                data: {},
            });
        }
    }
}
