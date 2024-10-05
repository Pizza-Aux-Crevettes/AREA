import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { of } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class RegisterService {
    private API_URL = "http://localhost:3000";

    constructor(private http: HttpClient) {}
    register(
        name: string,
        surname: string,
        username: string,
        email: string,
        password: string
    ) {
        const headers = new HttpHeaders({
            "Content-Type": "application/json",
        });

        try {
            return this.http.post<any>(
                `${this.API_URL}/api/setUsers`,
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

    setNewUser(email: string) {
        const headers = new HttpHeaders({
            "Content-Type": "application/json",
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
