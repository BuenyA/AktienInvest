import { Component, Input } from '@angular/core';
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
    selector: 'app-homepage-deine-aktien',
    templateUrl: './homepage-deine-aktien.component.html',
    styleUrls: ['./homepage-deine-aktien.component.scss']
})
export class HomepageDeineAktienComponent {

    @Input() multiplayerMode: boolean = false;
  
    constructor(private getOwnStockDataService: StockPreviewDataService) { }

    allDataSelected = false;
    dataSource: PeriodicElement[] = [];

    ngOnInit(): void {
        if (this.multiplayerMode) {
            this.getMltpOwnStockData();
        } else {
            this.getOwnStockData();
        }
    }

    getOwnStockData() {
        this.getOwnStockDataService.getOwnStocks().then(data => {
            this.dataSource = data;
            this.allDataSelected = true;
        }).catch(error => {
            console.error(error);
        });
    }

    getMltpOwnStockData() {
        this.getOwnStockDataService.getMltpOwnStocks().then(data => {
            this.dataSource = data;
            this.allDataSelected = true;
        }).catch(error => {
            console.error(error);
        });
    }
}