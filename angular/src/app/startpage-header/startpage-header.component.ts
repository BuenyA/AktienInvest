import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-startpage-header',
    templateUrl: './startpage-header.component.html',
    styleUrls: ['./startpage-header.component.scss']
})
export class StartpageHeaderComponent {

    constructor(private authService: AuthService, private cookieService: CookieService) { }

    logout() {
        this.authService.logout();
    }

    isLoggedIn(): boolean {
        if (!this.authService.loggedIn) {
            return false;
        }
        return true;
    }
}