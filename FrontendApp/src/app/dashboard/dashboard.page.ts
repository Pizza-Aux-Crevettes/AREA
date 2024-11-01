import { Component, OnInit } from '@angular/core';
import { AreaService } from 'src/app/services/area/area.service';
import { LocalStorageService } from '../services/localStorage/localStorage.service';
import { IonSelect, ActionSheetController } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { TokenService } from '../services/token/token.service';
import { ApiService } from '../services/api/api.service';
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
    isDislexicFontEnabled?: boolean;
    hoverText: string = '';
    selectedActionLabel = 'Action';
    selectedActionIcon = 'ellipse';
    selectedReactionLabel = 'Reaction';
    selectedReactionIcon = 'ellipse';
    showIcon = false;

    areas: Area[] = [];

    githubOrgs: any[] = [];
    orgChosen: string = '';
    orgfinal: string = '';
    githubRep: any[] = [];
    repChosen: string = '';
    repfinal: string = '';
    filterRep: any[] = [];

    tokenGithub: string = '';
    orgsUser: any;
    personnalUser: any;

    emailInput: string = '';
    emailInputFinal: string = '';

    idDiscordInput: string = '';
    idDiscordInputFinal: string = '';

    formattedReaction: string = '';

    serviceList: string[] = [
        'spotify_token',
        'twitch_token',
        'google_token',
        'discord_token',
        'github_token',
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
        { action: 'Weather', label: 'When it rains', icon: 'rainy-outline', connected: false },
        { action: 'Email', label: 'When I receive an email', icon: 'logo-google', connected: false },
        { action: 'Alerts', label: 'When an alert happens', icon: 'rainy-outline', connected: false },
        { action: 'News', label: 'When news is published', icon: 'newspaper', connected: false },
        { action: 'DiscordUsername', label: 'When my username changes', icon: 'logo-discord', connected: false },
        { action: 'DiscordGuilds', label: 'When my guild count changes', icon: 'logo-discord', connected: false },
    ];

    menuItemsReaction = [
        { reaction: 'Spotify', label: 'Play sad music', icon: 'musical-notes', connected: false },
        { reaction: 'sendEmail', label: 'Send an email', icon: 'logo-google', connected: false },
        { reaction: 'MP', label: 'Send a private message', icon: 'logo-discord', connected: false },
        { reaction: 'Clip', label: 'Create a clip', icon: 'logo-twitch', connected: false },
        { reaction: 'Event', label: 'Create an event on Google Calendar', icon: 'logo-google', connected: false },
        { reaction: 'Issue', label: 'Create an issue', icon: 'logo-github', connected: false },
        { reaction: 'Branch', label: 'Create a branch', icon: 'logo-github', connected: false },
    ];

    emptyField: string = '';

    constructor(
        private localStorage: LocalStorageService,
        private areaService: AreaService,
        private utilsService: UtilsService,
        private tokenService: TokenService,
        private actionSheetCtrl: ActionSheetController,
        private reactionSheetCtrl: ActionSheetController,
        private apiService: ApiService
    ) {}

    ngOnInit() {
        let userToken = this.localStorage.getItem('token');

        this.areaService
            .getArea(`${this.localStorage.getItem('token')}`)
            .subscribe((res) => {
                this.areas = res;
                if (this.areas.length == 0) {
                    this.addNewArea();
                    this.addNewArea();
                }
            });
        this.utilsService.fetchAdaptability(userToken);
        this.utilsService.isDislexicFont$.subscribe((fontState) => {
            this.isDislexicFontEnabled = fontState;
        });
        this.checkConnection();
    }
    isAreaDisabled(area: Area): boolean {
        return area.inputAction !== '';
    }

    checkServicesConnexion(area: string): boolean {
        switch (area) {
            case 'Email':
                if (this.localStorage.getItem('google_token') === 'false') {
                    return false;
                }
                break;
            case 'DiscordUsername':
                if (this.localStorage.getItem('discord_token') === 'false') {
                    return false;
                }
                break;
            case 'DiscordGuilds':
                if (this.localStorage.getItem('discord_token') === 'false') {
                    return false;
                }
                break;
            case 'Spotify':
                if (this.localStorage.getItem('spotify_token') === 'false') {
                    return false;
                }
                break;
            case 'sendEmail':
                if (this.localStorage.getItem('google_token') === 'false') {
                    return false;
                }
                break;
            case 'Clip':
                if (this.localStorage.getItem('twitch_token') === 'false') {
                    return false;
                }
                break;
            case 'Event':
                if (this.localStorage.getItem('google_token') === 'false') {
                    return false;
                }
                break;
            case 'Issue':
                if (this.localStorage.getItem('github_token') === 'false') {
                    return false;
                }
                break;
            case 'Branch':
                if (this.localStorage.getItem('github_token') === 'false') {
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

    clearUrl() {
        const url = window.location.href.split('?')[0];
        window.history.replaceState({}, document.title, url);
    }

    toggleDislexicFont() {
        const userToken = this.localStorage.getItem('token');
        this.utilsService.toggleDislexicFont(userToken, this);
    }

    deleteCookies() {
        this.utilsService.deleteCookies(this.serviceList);
    }

    openMenu(menu: IonSelect) {
        this.utilsService.openMenu(menu);
    }

    onSelectNavigate(event: any) {
        this.utilsService.onSelectNavigate(event, this);
    }

    onSelectParam(event: any) {
        this.utilsService.onSelectParam(event, this);
    }

    onSelectAction(action: string, area: Area) {
        area.action = action;
    }

    async onSelectReaction(reaction: string, area: Area) {
        area.reaction = reaction;
        this.orgChosen = '';
        this.orgfinal = '';
        this.repChosen = '';
        this.repfinal = '';
        this.emailInput = '';
        this.emailInputFinal = '';
        this.idDiscordInput = '';
        this.idDiscordInputFinal = '';

        if (area.reaction === 'Branch' || area.reaction === 'Issue') {
            try {
                const userToken = localStorage.getItem('token');
                if (userToken) {
                    this.tokenService
                        .getUserData(userToken)
                        .subscribe((res) => {
                            this.tokenService
                                .getServicesTokens(res.email)
                                .subscribe((res) => {
                                    this.tokenGithub = res[0].github_token;
                                    if (this.tokenGithub) {
                                        this.apiService
                                            .fetchGitHubData(
                                                'https://api.github.com/user/orgs',
                                                this.tokenGithub
                                            )
                                            .subscribe((res) => {
                                                this.orgsUser = res;

                                                this.personnalUser =
                                                    this.apiService
                                                        .fetchGitHubData(
                                                            'https://api.github.com/user',
                                                            this.tokenGithub
                                                        )
                                                        .subscribe((res) => {
                                                            this.personnalUser =
                                                                res;

                                                            if (
                                                                this.orgsUser &&
                                                                this
                                                                    .personnalUser
                                                            ) {
                                                                this.githubOrgs =
                                                                    [
                                                                        ...this
                                                                            .orgsUser,
                                                                        this
                                                                            .personnalUser,
                                                                    ];
                                                            }
                                                            this.apiService
                                                                .getRep(
                                                                    this
                                                                        .githubOrgs,
                                                                    this
                                                                        .tokenGithub
                                                                )
                                                                .subscribe(
                                                                    (
                                                                        allRep
                                                                    ) => {
                                                                        if (
                                                                            allRep
                                                                        ) {
                                                                            this.githubRep =
                                                                                allRep;
                                                                        }
                                                                    },
                                                                    (error) => {
                                                                        console.error(
                                                                            'Error fetching repositories:',
                                                                            error
                                                                        );
                                                                    }
                                                                );
                                                        });
                                            });
                                    }
                                });
                        });

                }
            } catch (error) {
                console.error(
                    'Erreur lors de la récupération des données GitHub :',
                    error
                );
            }
        }
    }

    async openActionSheet(area: Area) {
        const buttons = this.menuItemsAction.map(item => ({
            text: item.label,
            icon: item.icon,
            cssClass: item.connected ? '' : 'disabled-button',
            handler: () => {
            if (item.connected) {
                    this.onSelectAction(item.action, area);
                    this.selectedActionLabel = item.action;
                    this.selectedActionIcon = item.icon;
                }
            },
                disabled: !item.connected
        }));
      
        const actionSheet = await this.actionSheetCtrl.create({
          header: 'Select Action',
          buttons: buttons
        });
      
        await actionSheet.present();
      }      

      async openReactionSheet(area: Area) {
        const buttons = this.menuItemsReaction.map(item => ({
            text: item.label,
            icon: item.icon,
            cssClass: item.connected ? '' : 'disabled-button',
            handler: () => {
                if (item.connected) {
                    this.onSelectReaction(item.reaction, area);
                    this.selectedReactionLabel = item.reaction;
                    this.selectedReactionIcon = item.icon;
                }
            },
            disabled: !item.connected
        }));
    
        const reactionSheet = await this.reactionSheetCtrl.create({
          header: 'Select Reaction',
          buttons: buttons
        });
    
        await reactionSheet.present();
      }


    private async fetchGitHubData(url: string): Promise<any> {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/vnd.github.v3+json',
                    'Authorization': `Bearer ${this.localStorage.getItem('github_token')}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP! Statut: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Erreur lors de l'appel de l'API GitHub :", error);
            throw error;
        }
    }

    private async getRep(githubOrgs: any[]) {
        try {
            const orgFetchPromises = githubOrgs.map(org =>
                fetch(`https://api.github.com/users/${org.login}/repos`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/vnd.github.v3+json',
                        'Authorization': `Bearer ${this.localStorage.getItem('github_token')}`,
                    },
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Error fetching repos for org ${org.login}: ${response.status}`);
                        }
                        return response.json();
                    })
            );
            const orgRepos = await Promise.all(orgFetchPromises);
            const flatOrgRepos = orgRepos.reduce((acc, val) => acc.concat(val), []);
            return flatOrgRepos;
        } catch (error) {
            console.error('Failed to fetch repositories:', error);
            return null;
        }
    }

    existingReaction(reactInput: string, reaction: string) {
        const spaceIndex = reactInput.indexOf(' ');

        if (reaction === 'MP') {
            const idDiscord = reactInput.substring(0, spaceIndex);
            const mess = reactInput.substring(spaceIndex + 1);
            return `Id Discord: ${idDiscord}, Message: ${mess}`;
        } else if (reaction === 'sendEmail') {
            const email = reactInput.substring(0, spaceIndex);
            const mess = reactInput.substring(spaceIndex + 1);
            return `Email: ${email}, Message: ${mess}`;
        } else if (reaction === 'Branch' || reaction === 'Issue') {
            const secondSpaceIndex = reactInput.indexOf(' ', spaceIndex + 1);
            const orgUser = reactInput.substring(0, spaceIndex);
            const repos = reactInput.substring(spaceIndex + 1, secondSpaceIndex);
            const name = reactInput.substring(secondSpaceIndex + 1);
            return `Organisation/User: ${orgUser}, Repos: ${repos}, Name/Title: ${name}`;
        }
        return reactInput;
    }

    orgsVal(value: any) {
        this.repChosen = '';
        this.repfinal = '';
        this.orgChosen = value.detail.value;
        this.orgfinal = value.detail.value + ' ';
        this.filterRep = this.githubRep.filter(
            (userRep) => userRep.owner.login === this.orgChosen
        );
    }

    repsVal(value: any) {
        this.repChosen = value.detail.value;
        this.repfinal = value.detail.value + ' ';
    }

    onSelectCity(event: any, area: Area) {
        area.inputAction = event.detail.value;
    }

    emailInputChange(value: any) {
        this.emailInput = value.detail.value;
        this.emailInputFinal = value.detail.value + ' ';
    }

    idDiscordInputChange(value: any) {
        this.idDiscordInput = value.detail.value;
        this.idDiscordInputFinal = value.detail.value + ' ';
    }

    DelArea(id: number) {
        const token = this.localStorage.getItem('token');
        if (!token) return;

        const area = this.areas.find((area) => area.id === id);
        if (area) {
            const body = {
                action: area.action,
                reaction: area.reaction,
                inputAction: area.inputAction,
                inputReaction: area.inputReaction,
            };
            this.areaService.delArea(token, body).subscribe(() => {
                this.areas = this.areas.filter((area) => area.id !== id);
            });
            this.areaService.DelEmailUser(token).subscribe(() => { });
        }
    }

    ApplyArea(
        action: string,
        reaction: string,
        inputAction?: string,
        inputReaction?: string
    ) {
        if (action === 'DiscordUsername' || action === 'DiscordGuilds') {
            inputAction = 'Nothing';
        }
        if (reaction === 'Spotify') {
            inputReaction = 'Nothing';
        }
        if ((reaction === 'Branch' || reaction === 'Issue') && this.orgfinal === '' && this.repfinal === '') {
            alert('Please complete all fields');
            return;
        }
        if (reaction === 'MP' && this.idDiscordInputFinal === '') {
            alert('Please complete all fields');
            return;
        }
        if (reaction === 'sendEmail' && this.emailInputFinal === '') {
            alert('Please complete all fields');
            return;
        }
        if (
            action === '' ||
            reaction === '' ||
            inputAction === '' ||
            inputReaction == ''
        ) {
            alert('Please complete all fields');
        } else {
            this.emptyField = '';
            const token = this.localStorage.getItem('token');
            if (token) {
                this.areaService
                    .setArea(
                        token,
                        action,
                        reaction,
                        inputAction,
                        this.idDiscordInputFinal +
                            this.emailInputFinal +
                            this.orgfinal +
                            this.repfinal +
                            inputReaction
                    )
                    .subscribe((response) => {
                        window.location.reload();
                    });
            }
        }
    }
}
