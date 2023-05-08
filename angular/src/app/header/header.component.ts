import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service'
import { MultiplayerAccountDataService } from '../services/multiplayer-services/multiplayer-account-data.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    constructor(private authService: AuthService, private cookieService: CookieService, private multiplayer: MultiplayerAccountDataService, private router: Router) { }

    multiplayerMode: boolean;
    mltpStatus = {};

    ngOnInit(): void {
        this.multiplayerMode = this.multiplayer.multiplayerMode;
    }

    logout() {
        this.authService.logout();
    }

    isLoggedIn(): boolean {
        if (!this.authService.loggedIn) {
            return false;
        }
        return true;
    }

    multiplayerStatus() {
        this.multiplayer.userMultiplayerStatus().then(data => {
            console.log(data['results'])
            if (data['results'] == true) {
                this.router.navigate(['/multiplayer/homepage']);
            } else {
                this.router.navigate(['/multiplayer/startscreen']);
            }
        }).catch(error => {
            console.error(error);
        });
    }
}