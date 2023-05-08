import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StockPreviewDataService } from 'src/app/services/stock-preview-data.service';

@Component({
    selector: 'app-multiplayer-erstellen-dialog',
    templateUrl: './multiplayer-erstellen-dialog.component.html',
    styleUrls: ['./multiplayer-erstellen-dialog.component.scss']
})
export class MultiplayerErstellenDialogComponent {
    
    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private getOwnStockDataService: StockPreviewDataService, private router: Router) { }

    gameID: number;

    ngOnInit(): void {
        this.gameID = this.data.gameID;
        console.log(this.gameID)
    }
}
