import { Component, OnInit } from "@angular/core";
import { TokenService } from "src/app/services/token/token.service";
import { SpotifyService } from "src/app/services/spotify/spotify.service";
import { RegisterService } from "src/app/services/register/register.service";
import { WeatherService } from "src/app/services/weather/weather.service";
import { LocalStorageService } from "../services/localStorage/localStorage.service";
import { Router } from "@angular/router";

interface Area {
    id: number;
    selectedAction: string;
    selectedReaction: string;
    selectedCity?: string;
}
@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.page.html",
    styleUrls: ["./dashboard.page.scss"],
})
export class DashboardPage {
    areas: Area[] = [];
    cities = [
        { name: "Paris" },
        { name: "Marseille" },
        { name: "Lyon" },
        { name: "Toulouse" },
        { name: "Nice" },
        { name: "Nantes" },
        { name: "Montpellier" },
        { name: "Strasbourg" },
        { name: "Bordeaux" },
        { name: "Lille" },
    ];
    constructor(
        private tokenService: TokenService,
        private spotifyService: SpotifyService,
        private registerService: RegisterService,
        private weatherService: WeatherService,
        private localStorage: LocalStorageService,
        private router: Router
    ) {
        this.areas = [
            { id: 1, selectedAction: '', selectedReaction: '', selectedCity: '' },
            { id: 2, selectedAction: '', selectedReaction: '', selectedCity: '' },
            { id: 3, selectedAction: '', selectedReaction: '', selectedCity: '' }
        ];
    }

    AddNewArea() {
        const newArea: Area = {
            id: this.areas.length + 1,
            selectedAction: '',
            selectedReaction: '',
            selectedCity: ''
        };
        this.areas.push(newArea);
    }

    DelArea(id: number) {
        this.areas = this.areas.filter((area) => area.id !== id);
    }

    onSelectAction(event: any, area: Area) {
        area.selectedAction = event.detail.value;
    }

    onSelectReaction(event: any, area: Area) {
        area.selectedReaction = event.detail.value;
    }

    onSelectCity(event: any, area: Area) {
        area.selectedCity = event.detail.value;
    }

    deleteCookies() {
        console.log("test");
        this.localStorage.removeItem("token");
        this.router.navigate(["/login"]);
    }

    playPreview(trackId: string, token_spotify: string) {
        this.spotifyService.getTrackPreview(trackId, token_spotify).subscribe(
            (data) => {
                const previewUrl = data.preview_url;
                if (previewUrl) {
                    const audio = new Audio(previewUrl);
                    audio.play();
                } else {
                    console.log("No preview available for this song.");
                }
            },
            (error) => {
                console.error("Error fetching track preview:", error);
            }
        );
    }

    ApplyArea(area: Area) {
        let actionOk = false;
        let userEmail = "";
        let token_spotify = "";
        let token = this.localStorage.getItem("token");

        if (area.selectedAction === "Weather") {
            this.weatherService
                .getServicesWeather(area.selectedCity!)
                .subscribe((response) => {
                    if (response) {
                        actionOk = true;
                        if (token !== null) {
                            this.tokenService.getUserData(token).subscribe(
                                (response) => {
                                    userEmail = response;
                                    if (area.selectedReaction === "Spotify" && actionOk && userEmail !== "") { 
                                        console.log(userEmail);               
                                        this.tokenService
                                            .getServicesTokens(userEmail)
                                            .subscribe((response) => {
                                                console.log("response = ", response[0].token_spotify);
                                                token_spotify = response[0].token_spotify;
                                                if (token_spotify !== "") {
                                                    this.playPreview(
                                                        "1Fid2jjqsHViMX6xNH70hE",
                                                        token_spotify
                                                    );
                                                }
                                            });
                                    }
                                },
                                (error) => {
                                    console.error("Erreur lors de l'appel:", error);
                                }
                            );
                        }
                    }
                });
        }
    }
}
