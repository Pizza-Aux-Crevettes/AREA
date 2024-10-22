import { Component, OnInit, ViewChild } from '@angular/core';
import { TokenService } from 'src/app/services/token/token.service';
import { SpotifyService } from 'src/app/services/spotify/spotify.service';
import { WeatherService } from 'src/app/services/weather/weather.service';
import { GmailService } from 'src/app/services/gmail/gmail.service';
import { AreaService } from 'src/app/services/area/area.service';
import { of, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LocalStorageService } from '../services/localStorage/localStorage.service';
import { Router } from '@angular/router';
import { IonSelect } from '@ionic/angular';

interface Area {
    id: number;
    action: string;
    reaction: string;
    inputAction: string;
    inputReaction: string;
    userEmail: string;
    local: boolean;
}
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
    providers: [AreaService],
})

export class DashboardPage implements OnInit {
    @ViewChild('menu', { static: false }) menu!: IonSelect;
    areas: Area[] = [];
    
    serviceList: string[] = [
      'spotify_token',
      'twitch_token',
      'google_token',
      'discord_token',
      'spotify_refresh',
      'google_refresh',
      'twitch_refresh',
      'discord_refresh',
    ];
  
    cities: any[] = [
      { name: 'Paris' },
      { name: 'Marseille' },
      { name: 'Lyon' },
      { name: 'Toulouse' },
      { name: 'Nice' },
      { name: 'Nantes' },
      { name: 'Montpellier' },
      { name: 'Strasbourg' },
      { name: 'Bordeaux' },
      { name: 'Lille' },
    ];
  
    cities_alerts = [
      { name: 'Tokyo' },
      { name: 'Jakarta' },
      { name: 'Manille' },
      { name: 'Port-au-Prince' },
      { name: 'Mexico City' },
      { name: 'Los Angeles' },
      { name: 'Calcutta' },
      { name: 'Dhaka' },
      { name: 'Caracas' },
      { name: 'Christchurch' },
    ];
  
    constructor(
      private localStorage: LocalStorageService,
      private router: Router,
      private areaService: AreaService
    ) {}
  
    ngOnInit() {
      const token = this.localStorage.getItem('token');
      if (token) {
        this.areaService.getArea(token).subscribe((res) => {
          this.areas = res;
          if (this.areas.length === 0) {
            this.addNewArea();
            this.addNewArea();
          }
        });
      }
    }
  
    deleteCookies() {
      this.localStorage.removeItem('token');
      this.serviceList.forEach(service => {
        if (this.localStorage.getItem(service)) {
          this.localStorage.removeItem(service);
        }
      });
      this.router.navigate(['/']);
    }
  
    moveToPage(navigate: string) {
      this.router.navigate([navigate]);
    }
  
    addNewArea(): void {
      const newArea: Area = {
        id: this.areas.length,
        action: '',
        reaction: '',
        inputAction: '',
        inputReaction: '',
        userEmail: '',
        local: true,
      };
      this.areas.push(newArea);
    }
  
    onSelectAction(event: any, area: Area) {
      area.action = event.detail.value;
    }
  
    onSelectReaction(event: any, area: Area) {
      area.reaction = event.detail.value;
    }
  
    onSelectCity(event: any, area: Area) {
      area.inputAction = event.detail.value;
    }
  
    openMenu() {
      this.menu.open();
    }
  
    onSelectNavigate(event: any) {
      const selectedValue = event.detail.value;
      if (selectedValue === 'Dashboard') {
        this.moveToPage('/dashboard');
      } else if (selectedValue === 'Service') {
        this.moveToPage('/service');
      }
    }
  
    DelArea(id: number) {
      const token = this.localStorage.getItem('token');
      if (!token) return;
  
      const area = this.areas.find(area => area.id === id);
      if (area) {
        const body = {
          action: area.action,
          reaction: area.reaction,
          inputAction: area.inputAction,
          inputReaction: area.inputReaction,
        };
        this.areaService.delArea(token, body).subscribe(() => {
          this.areas = this.areas.filter(area => area.id !== id);
        });
      }
    }
  
    ApplyArea(action: string, reaction: string, inputAction?: string, inputReaction?: string) {
      const token = this.localStorage.getItem('token');
      if (token) {
        this.areaService.setArea(token, action, reaction, inputAction, inputReaction).subscribe(response => {
          console.log(response);
        });
      }
    }
  }