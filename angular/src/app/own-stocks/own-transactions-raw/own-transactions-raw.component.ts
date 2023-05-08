import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Input } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
    logo: string;
    symbol: string;
    number: number;
    price: number;
    buyed: string;
    selled: string;
}

@Component({
    selector: 'app-own-transactions-raw',
    templateUrl: './own-transactions-raw.component.html',
    styleUrls: ['./own-transactions-raw.component.scss']
})
export class OwnTransactionsRawComponent {
    @Input() dataSource: PeriodicElement[];
    @Input() allDataSelected: boolean;
    displayedColumns: string[] = ['Logo', 'Symbol', 'Anzahl', 'Kurs', 'Entwicklung'];
    displayedColumns2: string[] = ['Logo', 'Symbol', 'Anzahl', 'Betrag (insg.)', 'Gekauft', 'Verkauft'];
    clickedRows = new Set<PeriodicElement>();
}