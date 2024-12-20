import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
} from '@angular/common/http';
import { catchError, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class RegisterService {
    API_URL = localStorage.getItem('userInputIP') ? `${localStorage.getItem('userInputIP')}` : environment.api;

    constructor(private http: HttpClient) {}
    register(
        name: string,
        surname: string,
        username: string,
        email: string,
        password: string
    ) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        return this.http
            .post<any>(
                `${this.API_URL}/api/register`,
                JSON.stringify({
                    email: email,
                    name: name,
                    surname: surname,
                    username: username,
                    password: password,
                }),
                {
                    headers: headers,
                }
            )
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    console.error('Request error : ', error);
                    return throwError(error);
                })
            );
    }

    setNewUser(email: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        try {
            return this.http.post<any>(
                `${this.API_URL}/api/setNewUSer`,
                JSON.stringify({
                    userEmail: email,
                }),
                {
                    headers: headers,
                }
            );
        } catch (error) {
            console.error('Error :', error);
            return of({
                status: 500,
                error: true,
                message: 'Error when set new user in db',
                data: {},
            });
        }
    }
}
