import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../multiplayer-startscreen-erstellen/multiplayer-startscreen-erstellen.component';
import { Observable, map, startWith } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-multiplayer-startscreen-beitreten',
  templateUrl: './multiplayer-startscreen-beitreten.component.html',
  styleUrls: ['./multiplayer-startscreen-beitreten.component.scss']
})
export class MultiplayerStartscreenBeitretenComponent implements OnInit {

    hide = true;

    MultiplayerForm: FormGroup;

    constructor(private http: HttpClient, private router: Router) { }

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
            this.http.post('http://localhost/api/v1/multiplayer/beitreten', body, { headers: headers, withCredentials: true }).subscribe(
                (response) => {
                    console.log(response)
                    this.router.navigate(['/multiplayer/homepage']);
                }, (error) => {
                    console.log(error);
                    this.router.navigate(['/multiplayer/failed']);
                }
            )
        }
    }
}
