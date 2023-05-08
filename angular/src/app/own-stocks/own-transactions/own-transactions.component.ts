import { Component, Input } from '@angular/core';

export interface PeriodicElement {
    logo: string;
    symbol: string;
    number: number;
    price: number;
    trend: number;
}

@Component({
    selector: 'app-own-transactions',
    templateUrl: './own-transactions.component.html',
    styleUrls: ['./own-transactions.component.scss']
})
export class OwnTransactionsComponent {
    @Input() dataSource: PeriodicElement[];
    @Input() allDataSelected: boolean;
    displayedColumns: string[] = ['Logo', 'Symbol', 'Anzahl', 'Kurs', 'Entwicklung'];
    clickedRows = new Set<PeriodicElement>();
}
