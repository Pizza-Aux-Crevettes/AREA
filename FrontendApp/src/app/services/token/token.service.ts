import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class TokenService {
    API_URL = localStorage.getItem('userInputIP');

    constructor(private http: HttpClient) {}

    getServicesTokens(email: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });

        try {
            return this.http.post<any>(
                `${this.API_URL}/api/getToken`,
                JSON.parse(
                    JSON.stringify({
                        user_email: email,
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

    getSubstringBeforeCharacter(word: string, char: string): string {
        const index = word.indexOf(char);
        return index !== -1 ? word.substring(0, index) : word;
    }

    setTokenInDb(
        token: string,
        userEmail: string,
        service: string
    ): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });

        try {
            return this.http.post<any>(
                `${this.API_URL}/api/setNewToken`,
                JSON.parse(
                    JSON.stringify({
                        userEmail: userEmail,
                        token: token,
                        service: service,
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

    revokeToken(service: string, token: string): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });
        console.log('route =', `${this.API_URL}/${service}/revoke`);
        try {
            return this.http.post<any>(
                `${this.API_URL}/${service}/revoke`,
                JSON.parse(
                    JSON.stringify({
                        token: token,
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
    getAdaptabilityUser(token: string | null): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        });

        return this.http.get<any>(`${this.API_URL}/api/getAdaptabilityUser`, {
            headers,
        });
    }

    setAdaptabilityUser(token: string | null): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        });
        const body = { token: token };

        return this.http.post<any>(
            `${this.API_URL}/api/setAdaptabilityUser`,
            body,
            { headers }
        );
    }
}
