import { Component, OnInit } from '@angular/core';
import { UtilsService } from './services/utils/utils.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
    isDislexicFontEnabled = false;

    constructor(private utilsService: UtilsService) {}

    ngOnInit() {
        this.utilsService.isDislexicFont$.subscribe((isEnabled) => {
            this.isDislexicFontEnabled = isEnabled;
            this.updateDislexicFont(isEnabled);
        });
    }

    updateDislexicFont(isEnabled: boolean) {
        const body = document.body;
        if (isEnabled) {
            body.classList.add('dislexic-font');
        } else {
            body.classList.remove('dislexic-font');
        }
    }
}
