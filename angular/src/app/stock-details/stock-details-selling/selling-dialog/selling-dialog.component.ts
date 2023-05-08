import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MultiplayerAccountDataService } from 'src/app/services/multiplayer-services/multiplayer-account-data.service';
import { StockPreviewDataService } from 'src/app/services/stock-preview-data.service';

export interface PeriodicElement {
    logo: string;
    symbol: string;
    number: number;
    price: number;
    trend: number;
}

@Component({
    selector: 'app-selling-dialog',
    templateUrl: './selling-dialog.component.html',
    styleUrls: ['./selling-dialog.component.scss']
})
export class SellingDialogComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private getOwnStockDataService: StockPreviewDataService, private router: Router, private multiplayer: MultiplayerAccountDataService) { }

    allDataSelected = false;
    dataSource: PeriodicElement[] = [];

    multiplayerMode: boolean = false;

    ngOnInit(): void {
        this.getOwnStockData();
    }

    getOwnStockData() {
        this.multiplayerMode = this.multiplayer.multiplayerMode;
        this.getOwnStockDataService.getBuyingStockData(this.data.stockSymbol, this.data.numberOfStocks).then(data => {
            this.dataSource = data;
            this.allDataSelected = true;
        }).catch(error => {
            console.error(error);
        });
    }

    sell() {
        const headers = { 'content-type': 'application/json' }
        const json = {
            "number": "" + this.data.numberOfStocks + "",
            "stockSymbol": "" + this.data.stockSymbol + ""
        };
        const body = JSON.stringify(json);

        this.http.post('http://localhost/api/v1/sellStock', body, { headers: headers, withCredentials: true }).subscribe((response) => {
            this.router.navigate(['/own-stocks']);
        },
            (error) => {
                console.log(error);
            },
        );
    }
   
    sellMltp() {
        const headers = { 'content-type': 'application/json' }
        const json = {
            "number": "" + this.data.numberOfStocks + "",
            "stockSymbol": "" + this.data.stockSymbol + ""
        };
        const body = JSON.stringify(json);

        this.http.post('http://localhost/api/v1/sellStockMltp', body, { headers: headers, withCredentials: true }).subscribe((response) => {
            this.router.navigate(['/own-stocks']);
        },
            (error) => {
                console.log(error);
                this.router.navigate(['/multiplayer/failed']);
            },
        );
    }
}
