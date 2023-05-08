import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-stock-details-metrics',
    templateUrl: './stock-details-metrics.component.html',
    styleUrls: ['./stock-details-metrics.component.scss']
})
export class StockDetailsMetricsComponent {

    @Input() dayHigh: number;
    @Input() dayLow: number;
    @Input() open: number;
    @Input() previousClose: number;
    @Input() price: number;
    @Input() yearHigh: number;
    @Input() yearLow: number;
    @Input() chgDol: number;
    @Input() chgPerc: number;
    @Input() stockSymbol: string;
}