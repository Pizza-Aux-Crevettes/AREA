import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: "root",
})
export class UserService {
    private API_URL = "http://localhost:3000";

    constructor(private http: HttpClient) {}

    // getUserData(endpoint: string, token: string): Observable<any> {
    //     const headers = new HttpHeaders({
    //         Authorization: `Bearer ${token}`,
    //         "Content-Type": "application/json",
    //     });
    //     return this.http.get(`${this.backendUrl}/${endpoint}`, { headers });
    // }
}
