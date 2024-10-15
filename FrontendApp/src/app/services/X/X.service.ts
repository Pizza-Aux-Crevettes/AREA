import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class XService {
    private API_URL = environment.api;

    constructor(private http: HttpClient) {}

    sendTweet(token: string, tweetText: string): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        return this.http
            .post<any>(
                `${this.API_URL}/twitter/send`,
                { token, text: tweetText },
                { headers }
            )
            .pipe(
                catchError((error) => {
                    console.error('Error:', error);
                    return of({
                        status: 500,
                        error: true,
                        message: 'Failed to send tweet',
                        data: {},
                    });
                })
            );
    }
}
