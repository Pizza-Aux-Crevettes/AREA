import { Component, OnInit } from "@angular/core";
import { TokenService } from "src/app/services/token/token.service";
import { SpotifyService } from "src/app/services/spotify/spotify.service";
import { RegisterService } from "src/app/services/register/register.service";
import { WeatherService } from "src/app/services/weather/weather.service";
import { LocalStorageService } from "../services/localStorage/localStorage.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.page.html",
    styleUrls: ["./dashboard.page.scss"],
})
export class DashboardPage {
    selectedAction: string;
    selectedReaction: string;
    selectedCity: string;

    constructor(
        private tokenService: TokenService,
        private spotifyService: SpotifyService,
        private registerService: RegisterService,
        private weatherService: WeatherService,
        private localStorage: LocalStorageService,
        private router: Router
    ) {
        this.selectedAction = "";
        this.selectedReaction = "";
        this.selectedCity = "";
    }
    areas = [{ id: 1 }, { id: 2 }, { id: 3 }];
    selectedActionValue: string = "";
    selectedReactionValue: string = "";
    selectedCityValue: string = "";

    addNewArea(): void {
        const newArea = {
            id: this.areas.length + 1,
        };
        this.areas = [...this.areas, newArea];
    }

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

    onSelectAction(event: any) {
        this.selectedActionValue = event.detail.value;
    }

    onSelectReaction(event: any) {
        this.selectedReactionValue = event.detail.value;
    }

    onSelectCity(event: any) {
        this.selectedCityValue = event.detail.value;
    }

    DelArea(id: number) {
        this.areas = this.areas.filter((area) => area.id !== id);
    }

    deleteCookies() {
        console.log("test");
        this.localStorage.removeItem("token");
        this.router.navigate(["/login"]);
    }

    AddArea() {
        const maxId = this.areas.reduce(
            (max, area) => (area.id > max ? area.id : max),
            0
        );
        const newArea = { id: maxId + 1 };
        this.areas.push(newArea);
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

    ApplyArea(action: string, reaction: string, city: string) {
        let actionOk = false;
        let userEmail = "";
        let token_spotify = "";
        let token = this.localStorage.getItem("token");

        if (action === "Weather") {
            this.weatherService
                .getServicesWeather(this.selectedCity)
                .subscribe((response) => {
                    if (response) {
                        actionOk = true;
                        if (token !== null) {
                            this.tokenService.getUserData(token).subscribe(
                                (response) => {
                                    userEmail = response;
                                    if (reaction === "Spotify" && actionOk && userEmail !== "") { 
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
