import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-registrierung',
    templateUrl: './registrierung.component.html',
    styleUrls: ['./registrierung.component.scss']
})
export class RegistrierungComponent implements OnInit {  //

    hide = true;

    //My Form
    RegistrierungForm: FormGroup;

    constructor(private http: HttpClient, private router: Router) { }

    serverAntwort: any;

    ngOnInit() {
        this.RegistrierungForm = new FormGroup(
            {
                anrede: new FormControl('', [Validators.required]),
                vorname: new FormControl('', [Validators.required]),
                nachname: new FormControl('', [Validators.required]),
                strasse: new FormControl(),
                hausnummer: new FormControl(),
                plz: new FormControl(),
                stadt: new FormControl(),
                spielername: new FormControl('', [Validators.required]),
                email: new FormControl('', [Validators.required]),
                passwort: new FormControl('', [Validators.required]),
            });
    }

    submit(): void {

        const headers = { 'content-type': 'application/json' }
        const body = JSON.stringify(this.RegistrierungForm.getRawValue());
        this.http.post('http://localhost/api/v1/registrierung/account-anlegen', body, { 'headers': headers }).subscribe((response) => {
            console.log(response); // Response means code is 200, successful
            this.serverAntwort = response;
            this.router.navigate(['/login'], { state: { serverAntwort: this.serverAntwort } }); // Passing server response to the login component
        },
            (error) => {
                console.log(error);
                this.serverAntwort = error.error.message;
            },
        );
    }
}