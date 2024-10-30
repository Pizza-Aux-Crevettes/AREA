import { Component, OnInit } from '@angular/core';
import { AreaService } from 'src/app/services/area/area.service';
import { LocalStorageService } from '../services/localStorage/localStorage.service';
import { IonSelect } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { TokenService } from '../services/token/token.service';
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

    areas: Area[] = [];

    githubOrgs: any[] = [];
    orgChosen: string = '';
    orgfinal: string = '';
    githubRep: any[] = [];
    repChosen: string = '';
    repfinal: string = '';
    filterRep: any[] = [];

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
        { action: 'Weather', label: 'When it rains', connected: false },
        { action: 'Email', label: 'When I receive an email', connected: false },
        { action: 'Alerts', label: 'When it is alerts', connected: false },
        { action: 'News', label: 'When news appears', connected: false },
        {
            action: 'DiscordUsername',
            label: 'When my discord username changes',
            connected: false,
        },
        {
            action: 'DiscordGuilds',
            label: 'When my number of discord guilds change',
            connected: false,
        },
    ];

    menuItemsReaction = [
        { reaction: 'Spotify', label: 'Sad music is played', connected: false },
        { reaction: 'sendEmail', label: 'Send an email', connected: false },
        { reaction: 'MP', label: 'Send a mp', connected: false },
        { reaction: 'Clip', label: 'Create a twitch clip', connected: false },
        {
            reaction: 'Event',
            label: 'Create a Event on Google Calendar',
            connected: false,
        },
        {
            reaction: 'Issue',
            label: 'Create an issue github',
            connected: false,
        },
        { reaction: 'Branch', label: 'Create a branch github', connected: false }
    ];

    emptyField: string = '';

    constructor(
        private localStorage: LocalStorageService,
        private areaService: AreaService,
        private utilsService: UtilsService,
        private tokenService: TokenService
    ) { }

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
                if (!this.localStorage.getItem('google_token')) {
                    return false;
                }
                break;
            case 'DiscordUsername':
                if (!this.localStorage.getItem('discord_token')) {
                    return false;
                }
                break;
            case 'DiscordGuilds':
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
            case 'Issue':
                if (!this.localStorage.getItem('github_token')) {
                    return false;
                }
                break;
            case 'Branch':
                if (!this.localStorage.getItem('github_token')) {
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

    onSelectAction(event: any, area: Area) {
        area.action = event.detail.value;
    }

    async onSelectReaction(event: any, area: Area) {
        area.reaction = event.detail.value;
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
                const orgsUser = await this.fetchGitHubData('https://api.github.com/user/orgs');
                const personnalUser = await this.fetchGitHubData('https://api.github.com/user');

                if (orgsUser && personnalUser) {
                    this.githubOrgs = [...orgsUser, personnalUser];
                }
                const allRep = await this.getRep(this.githubOrgs);
                if (allRep) {
                    this.githubRep = allRep;
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données GitHub :", error);
            }
        }
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
            console.log("MP: ", reaction)
            const idDiscord = reactInput.substring(0, spaceIndex);
            const mess = reactInput.substring(spaceIndex + 1);
            return `Id Discord: ${idDiscord}, Message: ${mess}`;
        } else if (reaction === 'sendEmail') {
            console.log("sendEmail: ", reaction)
            const email = reactInput.substring(0, spaceIndex);
            const mess = reactInput.substring(spaceIndex + 1);
            return `Email: ${email}, Message: ${mess}`;
        } else if (reaction === 'Branch' || reaction === 'Issue') {
            console.log("Issue: ", reaction)
            const secondSpaceIndex = reactInput.indexOf(' ', spaceIndex + 1);
            const orgUser = reactInput.substring(0, spaceIndex);
            const repos = reactInput.substring(spaceIndex + 1, secondSpaceIndex);
            const name = reactInput.substring(secondSpaceIndex + 1);
            return `Organisation/User: ${orgUser}, Repos: ${repos}, Name/Title: ${name}`;
        }
        return reactInput;
    }

    orgsVal(value: any) {
        this.orgChosen = value.detail.value;
        this.orgfinal = value.detail.value + ' ';
        this.filterRep = this.githubRep.filter(userRep => userRep.owner.login === this.orgChosen);
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
        if (
            action === '' ||
            reaction === '' ||
            inputAction === '' ||
            inputReaction == ''
        ) {
            alert("Please complete all fields");
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
                        this.idDiscordInputFinal + this.emailInputFinal + this.orgfinal + this.repfinal + inputReaction
                    )
                    .subscribe((response) => {
                        window.location.reload();
                    });
            }
        }
    }
}
