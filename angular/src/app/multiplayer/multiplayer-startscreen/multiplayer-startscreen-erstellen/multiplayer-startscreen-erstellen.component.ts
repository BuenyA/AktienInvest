import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MultiplayerErstellenDialogComponent } from './multiplayer-erstellen-dialog/multiplayer-erstellen-dialog.component';

interface MultiplayerResponse {
    insertId: number;
}

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

    MultiplayerForm: FormGroup;
    hide = true;

    constructor(private http: HttpClient, private router: Router, public dialog: MatDialog,) {}

    ngOnInit() {
        this.MultiplayerForm = new FormGroup(
            {
                password: new FormControl('', [Validators.required, Validators.minLength(4)]),
                budget: new FormControl('', [Validators.required, Validators.minLength(1)]),
                startDate: new FormControl('', [Validators.required]),
                endDate: new FormControl('', [Validators.required])
            });
    }

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
            this.http.post<MultiplayerResponse>('http://localhost/api/v1/multiplayer/erstellen', body, { headers: headers, withCredentials: true }).subscribe(
                response => {
                    if (response.insertId != 0) {
                        console.log(response.insertId)
                        this.router.navigate(['/multiplayer/homepage']);
                    } else {
                        this.router.navigate(['/multiplayer/failed']);
                    }
                },
                (error) => console.log(error)
            )
        }
    }

    openDialog(multiplayer: any): void {

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
            this.http.post<MultiplayerResponse>('http://localhost/api/v1/multiplayer/erstellen', body, { headers: headers, withCredentials: true }).subscribe(
                response => {
                    if (response.insertId != 0) {

                        console.log(response.insertId);

                        const dialogRef = this.dialog.open(MultiplayerErstellenDialogComponent, {
                            data: {
                                gameID: response.insertId
                            }
                        });
                        dialogRef.afterClosed().subscribe(result => {
                            console.log('Dialog result: ' + result)
                        });
                        // this.router.navigate(['/multiplayer/homepage']);
                    } else {
                        this.router.navigate(['/multiplayer/failed']);
                    }
                },
                (error) => console.log(error)
            )
        }
    }
}