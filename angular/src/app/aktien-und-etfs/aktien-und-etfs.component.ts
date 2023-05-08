import { Component, OnInit } from '@angular/core';
import { MultiplayerAccountDataService } from '../services/multiplayer-services/multiplayer-account-data.service';

@Component({
    selector: 'app-aktien-und-etfs',
    templateUrl: './aktien-und-etfs.component.html',
    styleUrls: ['./aktien-und-etfs.component.scss']
})
export class AktienUndEtfsComponent implements OnInit {

    multiplayerMode: boolean;

    constructor(private multiplayer: MultiplayerAccountDataService) { }

    ngOnInit(): void {
        this.multiplayerMode = this.multiplayer.multiplayerMode;
    }
}