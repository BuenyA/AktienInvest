import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { StockPreviewDataService } from '../services/stock-preview-data.service';
import { InfluxDB } from '@influxdata/influxdb-client';
import { MultiplayerAccountDataService } from '../services/multiplayer-services/multiplayer-account-data.service';

export interface PeriodicElement {
    logo: string;
    symbol: string;
    number: number;
    price: number;
    trend: number;
}

export interface PeriodicElement1 {
    logo: string;
    symbol: string;
    number: number;
    price: number;
    buyed: string;
    selled: string;
}

@Component({
    selector: 'app-own-stocks',
    templateUrl: './own-stocks.component.html',
    styleUrls: ['./own-stocks.component.scss']
})
export class OwnStocksComponent {
    
    constructor(public http: HttpClient, private getOwnStockDataService: StockPreviewDataService, private multiplayer: MultiplayerAccountDataService) { }

    Accountdaten = new Array<any>();

    stockCumulativeBudget = 0;
    allDataSelected = false;
    dataSource: PeriodicElement[] = [];
    allDataSelected1 = false;
    dataSource1: PeriodicElement1[] = [];

    multiplayerMode: boolean;

    ngOnInit(): void {
        this.multiplayerMode = this.multiplayer.multiplayerMode;
        this.getAccountData();
        if (this.multiplayerMode == true) {
            this.getMltpOwnStockData();
            this.getMltpOwnStockDataTransactions();
        } else {
            this.getOwnStockDataTransactions();
            this.getOwnStockData();
        }
    }

    getAccountData() {
        this.http.get<any[]>('http://localhost/api/v1/protected/mein-account', { withCredentials: true }).subscribe(data => { 
            // { withCredentials: true } ensures that cookies are allowed to send (CORS handling)
            this.Accountdaten = data;
        })
    }

    getOwnStockData() {
        this.getOwnStockDataService.getOwnStocks().then(data => {
            this.dataSource = data;
            for (let index = 0; index < data.length; index++) {
                this.stockCumulativeBudget = this.stockCumulativeBudget + (data[index]['number'] * data[index]['price'])
            }
            this.stockCumulativeBudget = this.stockCumulativeBudget + this.Accountdaten[0]['KONTOSTAND']
            this.allDataSelected = true;
        }).catch(error => {
            console.error(error);
        });
    }

    getMltpOwnStockData() {
        this.getOwnStockDataService.getMltpOwnStocks().then(data => {
            this.dataSource = data;
            console.log(data);
            for (let index = 0; index < data.length; index++) {
                this.stockCumulativeBudget = this.stockCumulativeBudget + (data[index]['number'] * data[index]['price'])
            }
            this.stockCumulativeBudget = this.stockCumulativeBudget + this.Accountdaten[0]['MLTP_KONTOSTAND']
            this.allDataSelected = true;
        }).catch(error => {
            console.error(error);
        });
    }

    getOwnStockDataTransactions() {
        this.getOwnStockDataService.getOwnTransactions().then(data => {
            this.dataSource1 = data;
            this.allDataSelected1 = true;
        }).catch(error => {
            console.error(error);
        });
    }
    
    getMltpOwnStockDataTransactions() {
        this.getOwnStockDataService.getMltpOwnTransactions().then(data => {
            this.dataSource1 = data;
            this.allDataSelected1 = true;
        }).catch(error => {
            console.error(error);
        });
    }
}
