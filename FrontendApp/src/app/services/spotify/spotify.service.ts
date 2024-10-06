import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class SpotifyService {
    private baseUrl = "https://api.spotify.com/v1";

    constructor(private http: HttpClient) {}

    getTrackPreview(trackId: string, token: string): Observable<any> {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
        });

        return this.http.get(`${this.baseUrl}/tracks/${trackId}`, { headers });
    }
}
