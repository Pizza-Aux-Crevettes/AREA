import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class WeatherService {
    private API_URL = 'http://localhost:8080';

    constructor(private http: HttpClient) {}
    getServicesWeather(city: string | undefined): Observable<any> {
        console.log(city);
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        const forJson = city;

        try {
            return this.http.post<any>(
                `${this.API_URL}/api/Weather`,
                JSON.stringify({
                    forJson,
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
                message: 'Error',
                data: {},
            });
        }
    }
}
