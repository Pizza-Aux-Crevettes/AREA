import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.page.html",
    styleUrls: ["./dashboard.page.scss"],
})
export class DashboardPage {
    constructor() {}
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
        console.log(this.selectedActionValue);
    }

    onSelectReaction(event: any) {
        this.selectedReactionValue = event.detail.value;
        console.log(this.selectedReactionValue);
    }

    onSelectCity(event: any) {
        this.selectedCityValue = event.detail.value;
        console.log(this.selectedCityValue);
    }

    DelArea(id: number) {
        this.areas = this.areas.filter((area) => area.id !== id);
    }

    AddArea() {
        const maxId = this.areas.reduce(
            (max, area) => (area.id > max ? area.id : max),
            0
        );
        const newArea = { id: maxId + 1 };
        this.areas.push(newArea);
        console.log(this.areas);
    }
}
