import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private cookieService: CookieService,
        private router: Router,
        private autenticate: AuthService
    ) { }

    canActivate(): boolean {
        if (!this.autenticate.loggedIn) {
            this.router.navigate(['/startpage']);
            return false;
        }
        return true;
    }
}
