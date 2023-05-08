import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    loggedIn: boolean = false;

    constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {
        if (this.cookieService.get('loggedIn') != '') {
            this.loggedIn = true;
        }
    }

    logout() {
        return this.http.get(`http://localhost/api/v1/logout`, {}).subscribe(() => {
            // Remove the JWT + loggedIn cookie (client-sided) using ngx-cookie-service
            this.cookieService.delete('jwt');
            this.cookieService.delete('loggedIn');
            this.loggedIn = false;

            setTimeout(() => {
                this.router.navigate(['/startpage']);
            }, 100);
        });
    }
}