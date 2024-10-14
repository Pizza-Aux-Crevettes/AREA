import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class GmailService {
    private API_URL = environment.api;

    constructor(private http: HttpClient) {}

    getGmailMsg(token: string): Observable<boolean> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        return this.http
            .post<any>(`${this.API_URL}/api/gmail/msg`, { token }, { headers })
            .pipe(
                map((response) => {
                    if (response.msg === 'Not new emails') {
                        return false;
                    } else {
                        return true;
                    }
                }),
                catchError((error) => {
                    console.error('Error:', error);
                    return of(false);
                })
            );
    }
    sendEmail(token: string, dest: string): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        return this.http
            .post<any>(
                `${this.API_URL}/api/gmail/send`,
                { token, dest },
                { headers }
            )
            .pipe(
                catchError((error) => {
                    console.error('Error:', error);
                    return of({
                        status: 500,
                        error: true,
                        message: 'Failed to send email',
                        data: {},
                    });
                })
            );
    }
}
