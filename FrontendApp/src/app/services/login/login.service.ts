import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { of } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class LoginService {
    private API_URL = "http://localhost:3000";

    constructor(private http: HttpClient) {}

    login(email: string, password: string) {
        const headers = new HttpHeaders({
            "Content-Type": "application/json",
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
