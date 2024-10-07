import { Component } from "@angular/core";
import { TokenService } from "src/app/services/token/token.service";
import { SpotifyService } from "src/app/services/spotify/spotify.service";
import { RegisterService } from "src/app/services/register/register.service";
import { WeatherService } from "src/app/services/weather/weather.service";
import { LocalStorageService } from "../services/localStorage/localStorage.service";
import { Router } from "@angular/router";
import { AlertController } from '@ionic/angular';

interface Area {
    id: number;
    selectedAction: string;
    selectedReaction: string;
    selectedCity?: string;
    buttonText: string;
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
        private router: Router,
        private alertController: AlertController
    ) {
        this.areas = [
            { id: 1, selectedAction: '', selectedReaction: '', selectedCity: '', buttonText: 'Apply' },
            { id: 2, selectedAction: '', selectedReaction: '', selectedCity: '', buttonText: 'Apply' },
            { id: 3, selectedAction: '', selectedReaction: '', selectedCity: '', buttonText: 'Apply' }
        ];
    }

    AddNewArea() {
        const newArea: Area = {
            id: this.areas.length + 1,
            selectedAction: '',
            selectedReaction: '',
            selectedCity: '',
            buttonText: 'Apply'
        };
        this.areas.push(newArea);
    }

    DelArea(id: number) {
        this.areas = this.areas.filter((area) => area.id !== id);
    }

    ApplyArea(area: Area) {
        if (area.buttonText === 'Apply') {
            area.buttonText = '■ Stop';
        } else {
            this.presentConfirm(area);
        }
    }

    async presentConfirm(area: Area) {
        const alert = await this.alertController.create({
            header: 'Confirm!',
            message: 'Are you sure you want to stop this area?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Stop action canceled');
                    }
                },
                {
                    text: 'Yes',
                    handler: () => {
                        area.buttonText = 'Apply';
                    }
                }
            ]
        });

        await alert.present();
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
        this.localStorage.removeItem("token");
        this.router.navigate(["/login"]);
    }

    moveToService() {
        this.router.navigate(["/service"]);
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
}
