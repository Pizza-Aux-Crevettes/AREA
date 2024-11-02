import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    API_URL = localStorage.getItem('userInputIP');

    constructor(private http: HttpClient) {}

    login(email: string, password: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        try {
            return this.http.post<any>(
                `${this.API_URL}/api/login`,
                JSON.stringify({
                    email: email,
                    password: password,
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
                message: 'Error when login user',
                data: {},
            });
        }
    }
}
