import { Component, OnInit } from '@angular/core';
import { MultiplayerAccountDataService } from '../services/multiplayer-services/multiplayer-account-data.service';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

    constructor(private multiplayer: MultiplayerAccountDataService) { }

    ngOnInit(): void {
        this.multiplayer.multiplayerMode = false;
    }
}