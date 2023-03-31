import { Component } from '@angular/core';

export interface PeriodicElement {
    name: string;
    logo: string;
    weight: number;
    symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { logo: 'assets/images/company_logos/amazon_icon.png', name: 'Amazon', weight: 1.0079, symbol: '+ 1,7%' },
    { logo: 'assets/images/company_logos/amazon_icon.png', name: 'PayPal', weight: 4.0026, symbol: '+ 1,7%' },
    { logo: 'assets/images/company_logos/amazon_icon.png', name: 'SAP', weight: 6.941, symbol: '+ 1,7%' },
    { logo: 'assets/images/company_logos/amazon_icon.png', name: 'Apple', weight: 9.0122, symbol: '+ 1,7%' },
    { logo: 'assets/images/company_logos/amazon_icon.png', name: 'Bayer', weight: 10.811, symbol: '+ 1,7%' },
    { logo: 'assets/images/company_logos/amazon_icon.png', name: 'Tesla', weight: 12.0107, symbol: '+ 1,7%' },
    { logo: 'assets/images/company_logos/amazon_icon.png', name: 'Lufthansa', weight: 14.0067, symbol: '+ 1,7%' },
    { logo: 'assets/images/company_logos/amazon_icon.png', name: 'Volkswagen', weight: 15.9994, symbol: '+ 1,7%' },
    { logo: 'assets/images/company_logos/amazon_icon.png', name: 'BASF', weight: 18.9984, symbol: '+ 1,7%' },
    { logo: 'assets/images/company_logos/amazon_icon.png', name: 'Rheinmetall', weight: 20.1797, symbol: '+ 1,7%' },
];

@Component({
    selector: 'app-aktien-preview',
    templateUrl: './aktien-preview.component.html',
    styleUrls: ['./aktien-preview.component.scss']
})
export class AktienPreviewComponent {
    displayedColumns: string[] = ['Logo', 'Unternehmen', 'Wert', 'Entwicklung'];
    dataSource = ELEMENT_DATA;
    clickedRows = new Set<PeriodicElement>();
}
