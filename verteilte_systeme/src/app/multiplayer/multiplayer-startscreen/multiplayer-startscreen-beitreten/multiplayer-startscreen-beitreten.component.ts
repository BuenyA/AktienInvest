import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../multiplayer-startscreen-erstellen/multiplayer-startscreen-erstellen.component';
import { Observable, map, startWith } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://127.0.0.1:8080';

@Component({
  selector: 'app-multiplayer-startscreen-beitreten',
  templateUrl: './multiplayer-startscreen-beitreten.component.html',
  styleUrls: ['./multiplayer-startscreen-beitreten.component.scss']
})
export class MultiplayerStartscreenBeitretenComponent implements OnInit {

    hide = true;

    MultiplayerForm: FormGroup;

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.MultiplayerForm = new FormGroup(
            {
                id: new FormControl('', [Validators.required]),
                password: new FormControl('', [Validators.required])
            });
    }

    multiplayerJoin(multiplayer: any) {
        const headers = { 'content-type': 'application/json' }
        const body = JSON.stringify(multiplayer);

        if (multiplayer.id == '') {
            return console.error('ID eingeben');
        } else if (multiplayer.password == '') {
            return console.error('Passwort eingeben');
        } else {
            this.http.post(baseUrl + '/api/v1/multiplayer/beitreten', body, { 'headers': headers }).subscribe(
                (response) => console.log(response),
                (error) => console.log(error)
            )
        }
    }
}
