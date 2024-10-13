import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class TokenService {
    private API_URL = environment.api;

    constructor(private http: HttpClient) {}

    getServicesTokens(email: any, service: string): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        try {
            return this.http.post<any>(
                `${this.API_URL}/api/getToken`,
                JSON.parse(
                    JSON.stringify({
                        user_email: email,
                        service,
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

    getUserData(token: string): Observable<any> {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        });

        try {
            return this.http.get<any>(`${this.API_URL}/api/user/me`, {
                headers: headers,
            });
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
