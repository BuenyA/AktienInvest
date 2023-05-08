import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-stock-details-header',
    templateUrl: './stock-details-header.component.html',
    styleUrls: ['./stock-details-header.component.scss']
})
export class StockDetailsHeaderComponent {
    @Input() stockName: string;
    @Input() stockSymbol: string;
    @Input() stockExchange: string;

    @Input() price: number;
    @Input() chgDol: number;
    @Input() chgPerc: number;
}
