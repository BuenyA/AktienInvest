import { Component, OnInit } from '@angular/core';
import { StockPreviewDataService } from 'src/app/services/stock-preview-data.service';

export interface PeriodicElement {
    name: string;
    logo: string;
    symbol: string;
    price: number;
    trend: number;
}

const stocks = ['AMZN', 'PYPL', 'SAP', 'AAPL', 'BAYRY', 'TSLA', 'DLAKY', 'VLKAF', 'BASFY', 'ALIZF']

@Component({
    selector: 'app-aktien-preview',
    templateUrl: './aktien-preview.component.html',
    styleUrls: ['./aktien-preview.component.scss']
})
export class AktienPreviewComponent implements OnInit{
    
    constructor(private getOwnStockDataService: StockPreviewDataService) { }

    displayedColumns: string[] = ['Logo', 'Unternehmen', 'Tickersymbol', 'Kurs', 'Entwicklung'];
    dataSource: PeriodicElement[] = [];
    clickedRows = new Set<PeriodicElement>();
    allDataSelected = false;

    ngOnInit(): void {
        this.getPreviewStockData();
    }

    getPreviewStockData() {
        this.getOwnStockDataService.getPreviewStockData().then(data => {
            this.dataSource = data;
            this.allDataSelected = true;
        }).catch(error => {
            console.error(error);
        });
    }
}
