import { Component, OnInit, ViewChild } from '@angular/core';
import { AreaService } from 'src/app/services/area/area.service';
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
    hoverText: string = '';
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

    menuItemsAction = [
        { action: 'Weather', label: 'When it rains', connected: false },
        { action: 'Email', label: 'When I receive an email', connected: false },
        { action: 'Alerts', label: 'When it is alerts', connected: false },
        {
            action: 'DiscordUsername',
            label: 'When my discord username changes',
            connected: false,
        },
    ];

    menuItemsReaction = [
        { reaction: 'Spotify', label: 'Sad music is played', connected: false },
        { reaction: 'sendEmail', label: 'Send an email', connected: false },
        { reaction: 'MP', label: 'Send a mp', connected: false },
        { reaction: 'Clip', label: 'Create a Twitch clip', connected: false },
        { reaction: 'Event', label: 'Create a Event on Google Calendar', connected: false },
    ];

    constructor(
      private localStorage: LocalStorageService,
      private router: Router,
      private areaService: AreaService
    ) {}
  
    ngOnInit() {
        this.areaService
            .getArea(`${this.localStorage.getItem('token')}`)
            .subscribe((res) => {
                console.log(res);
                this.areas = res;
                if (this.areas.length == 0) {
                    this.addNewArea();
                    this.addNewArea();
                }
            });
        this.checkConnection();
    }

    checkServicesConnexion(area: string): boolean {
        switch (area) {
            case 'Email':
                if (!this.localStorage.getItem('google_token')) {
                    return false;
                }
                break;
            case 'DiscordUsername':
                if (!this.localStorage.getItem('discord_token')) {
                    return false;
                }
                break;
            case 'Spotify':
                if (!this.localStorage.getItem('spotify_token')) {
                    return false;
                }
                break;
            case 'sendEmail':
                if (!this.localStorage.getItem('google_token')) {
                    return false;
                }
                break;
            case 'Clip':
                if (!this.localStorage.getItem('twitch_token')) {
                    return false;
                }
                break;
            case 'Event':
                if (!this.localStorage.getItem('google_token')) {
                    return false;
                }
                break;
            default:
                return true;
        }
        return true;
    }
    checkConnection() {
        for (let i = 0; i < this.menuItemsAction.length; i++) {
            this.menuItemsAction[i].connected = this.checkServicesConnexion(
                this.menuItemsAction[i].action
            );
        }
        for (let i = 0; i < this.menuItemsReaction.length; i++) {
            this.menuItemsReaction[i].connected = this.checkServicesConnexion(
                this.menuItemsReaction[i].reaction
            );
        }

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
  
    openMenu(menu: IonSelect) {
        if (menu) {
          menu.open();
        } else {
          console.log("Menu not found");
        }
    }
  
    onSelectNavigate(event: any) {
      const selectedValue = event.detail.value;
      if (selectedValue === 'Dashboard') {
        this.moveToPage('/dashboard');
      } else if (selectedValue === 'Service') {
        this.moveToPage('/service');
      }
    }


    onSelectParam(event: any) {
        const selectedValue = event.detail.value;
        if (selectedValue === 'Log out') {
          this.deleteCookies();
        } else if (selectedValue === 'Dislexic font') {
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