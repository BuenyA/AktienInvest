import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-startpage',
    templateUrl: './startpage.component.html',
    styleUrls: ['./startpage.component.scss']
})
export class StartpageComponent implements OnInit {

    constructor(private cookieService: CookieService, private autenticate: AuthService) { }

    images = ["/assets/images/background/background_img.jpg"];

    loadedImg = 0;

    ngOnInit(): void {
        this.loadImages();
    }

    isLoggedIn(): boolean {
        if (!this.autenticate.loggedIn) {
            return false;
        }
        return true;
    }

    loadImages() {
        for (let i = 0; i < this.images.length; i++) {
            let img = new Image();
            img.onload = () => {
                this.loaded();
            }
            img.src = this.images[i];
        }
    }

    loaded() {
        this.loadedImg++;
        if (this.images.length == this.loadedImg) {
            //all images loaded
        }
    }
}