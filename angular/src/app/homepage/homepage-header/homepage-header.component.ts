import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { StockPreviewDataService } from 'src/app/services/stock-preview-data.service';

@Component({
    selector: 'app-homepage-header',
    templateUrl: './homepage-header.component.html',
    styleUrls: ['./homepage-header.component.scss']
})
export class HomepageHeaderComponent implements OnInit {

    constructor(public http: HttpClient, private getOwnStockDataService: StockPreviewDataService) { }

    @Input() multiplayerMode: boolean = false;

    Accountdaten = new Array<any>();
    stockCumulativeBudget: number = 0;
    showCumulativeBudget: boolean = false;
    headline: string = "Guten Tag";

    whichHeader: boolean;

    ngOnInit(): void {
        this.getAccountData();
        this.getTimeHeadline();
        if (this.multiplayerMode) {
            this.getMltpOwnStockData();
        } else {
            this.getOwnStockData();
        }
    }

    getTimeHeadline() {
        const heute = new Date(); 				// current date and local-time
        if(heute.getHours() > 3 && heute.getHours() < 11) {
            this.headline = "Guten Morgen";
        } else if (heute.getHours() > 11 && heute.getHours() <= 16) {
            this.headline = "Guten Mittag";
        } else if (heute.getHours() > 16 || heute.getHours() < 4) {
            this.headline = "Guten Abend";
        }
    }

    getAccountData() {
        this.http.get<any[]>('http://localhost/api/v1/protected/mein-account', { withCredentials: true }).subscribe(data => {  // { withCredentials: true } ensures that cookies can be send (CORS-handling)
            this.Accountdaten = data;
            console.log(data)
        })
    }

    getOwnStockData() {
        this.getOwnStockDataService.getOwnStocks().then(data => {
            for (let index = 0; index < data.length; index++) {
                this.stockCumulativeBudget = this.stockCumulativeBudget + (data[index]['number'] * data[index]['price'])
            }
            this.stockCumulativeBudget = this.stockCumulativeBudget + this.Accountdaten[0]['KONTOSTAND']
            this.showCumulativeBudget = this.stockCumulativeBudget >= 0
        }).catch(error => {
            console.error(error);
        });
    }

    getMltpOwnStockData() {
        this.getOwnStockDataService.getMltpOwnStocks().then(data => {
            console.log(data);
            for (let index = 0; index < data.length; index++) {
                this.stockCumulativeBudget = this.stockCumulativeBudget + (data[index]['number'] * data[index]['price'])
            }
            this.stockCumulativeBudget = this.stockCumulativeBudget + this.Accountdaten[0]['MLTP_KONTOSTAND']
            this.showCumulativeBudget = this.stockCumulativeBudget >= 0
        }).catch(error => {
            console.error(error);
        });
    }
}
