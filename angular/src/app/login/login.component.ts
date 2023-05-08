import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieOptions, CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    hide = true;

    LoginForm: FormGroup;

    constructor(private http: HttpClient, private router: Router, private cookieService: CookieService, private autenticate: AuthService) { }

    serverAntwort: any; // Used to display any relvant information to the users

    ngOnInit() {
        this.serverAntwort = history.state.serverAntwort;

        this.LoginForm = new FormGroup(
            {
                email: new FormControl('', [Validators.required]),
                passwort: new FormControl('', [Validators.required]),
            });
    }

    submit(): void {

        const headers = { 'content-type': 'application/json' }
        const body = JSON.stringify(this.LoginForm.getRawValue());
        this.http.post('http://localhost/api/v1/login', body, { 'headers': headers },).subscribe((response: any) => { //response means code is 200
            this.cookieService.set('jwt', response.token, { secure: false });
            document.cookie = 'loggedIn=true';
            console.log(response);
            this.autenticate.loggedIn = true;
            this.serverAntwort = response.message;
            this.router.navigate(['/']);
        },
            (error) => { // case that any error code returns from the server
                console.log(error);
                this.serverAntwort = error.error.message;
            },
        );
    }
}
