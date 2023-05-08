import { Component, OnInit } from '@angular/core';
import { MultiplayerAccountDataService } from 'src/app/services/multiplayer-services/multiplayer-account-data.service';

@Component({
    selector: 'app-multiplayer-homepage',
    templateUrl: './multiplayer-homepage.component.html',
    styleUrls: ['./multiplayer-homepage.component.scss']
})
export class MultiplayerHomepageComponent implements OnInit {

    multiplayerMode: boolean = true;

    constructor(private multiplayer: MultiplayerAccountDataService) { }

    ngOnInit(): void {
        this.multiplayer.multiplayerMode = true;
        console.log(this.multiplayer.multiplayerMode);
    }
}