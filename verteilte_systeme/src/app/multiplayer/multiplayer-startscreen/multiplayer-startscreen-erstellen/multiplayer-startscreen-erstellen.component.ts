import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

//Database URL
const baseUrl = 'http://127.0.0.1:8080';

export interface User {
    name: string;
}
@Injectable({
    providedIn: 'root'
})
@Component({
    selector: 'app-multiplayer-startscreen-erstellen',
    templateUrl: './multiplayer-startscreen-erstellen.component.html',
    styleUrls: ['./multiplayer-startscreen-erstellen.component.scss']
})
export class MultiplayerStartscreenErstellenComponent implements OnInit {

    constructor(private http: HttpClient, private fb: FormBuilder) { }

    MultiplayerForm: FormGroup;

    hide = true;

    /* formatLabel(value: number): string {
        if (value >= 1000) {
            return Math.round(value / 1000) + 'k';
        }

        return `${value}`;
    } */

    myFilter = (d: Date | null): boolean => {
        const day = (d || new Date()).getDay();
        // Prevent Saturday and Sunday from being selected.
        return day !== 0 && day !== 6;
    };

    ngOnInit() {
        this.MultiplayerForm = new FormGroup(
            {
                password: new FormControl('', [Validators.required, Validators.minLength(4)]),
                budget: new FormControl('', [Validators.required, Validators.minLength(1)]),
                startDate: new FormControl('', [Validators.required]),
                endDate: new FormControl('', [Validators.required])
            });
    }

    /* getMessage(): void {
        console.log('test');
        this.http.get(baseUrl + '/api/test').subscribe();
    } */

    createMultiplayerGame(multiplayer: any): void {
        const headers = { 'content-type': 'application/json' }
        const body = JSON.stringify(multiplayer);

        if (multiplayer.password == '') {
            return console.error('Passwort eingeben');
        } else if (multiplayer.budget == '') {
            return console.error('Geldmenge eingeben');
        } else if (multiplayer.startDate == null) {
            return console.error('Anfangszeitpunkt eingeben');
        } else if (multiplayer.endDate == null) {
            return console.error('Endzeitpunkt eingeben');
        } else {
            this.http.post(baseUrl + '/api/v1/multiplayer/erstellen', body, { 'headers': headers }).subscribe(
                (response) => console.log(response),
                (error) => console.log(error)
            )
            // return console.error('No data defined');
        }
    }
}