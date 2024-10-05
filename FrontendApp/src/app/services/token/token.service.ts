import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class TokenService {
    private API_URL = "http://localhost:3000";

    constructor(private http: HttpClient) {}

    getServicesTokens(email: string): Observable<any> {
        const headers = new HttpHeaders({
            "Content-Type": "application/json",
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
            console.error("Error :", error);
            return of({
                status: 500,
                error: true,
                message: "Error",
                data: {},
            });
        }
    }
}
