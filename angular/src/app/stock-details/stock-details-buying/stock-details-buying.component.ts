import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BuyingDialogComponent } from './buying-dialog/buying-dialog.component';
import { GetAccountDataService } from 'src/app/services/get-account-data.service';
import { MultiplayerAccountDataService } from 'src/app/services/multiplayer-services/multiplayer-account-data.service';

@Component({
    selector: 'app-stock-details-buying',
    templateUrl: './stock-details-buying.component.html',
    styleUrls: ['./stock-details-buying.component.scss']
})
export class StockDetailsBuyingComponent {

    constructor(public dialog: MatDialog, private getAccDataService: GetAccountDataService, private multiplayer: MultiplayerAccountDataService) { }

    
    @Input() price: number;
    @Input() stockSymbol: string;
    
    data: any[];
    hide = true;
    numberOfStocks: number = 0;

    multiplayerMode: boolean = false;

    ngOnInit(): void {
        this.multiplayerMode = this.multiplayer.multiplayerMode;
        this.getAccDataService.getAccountData().subscribe(
            (response: any[]) => {
              this.data = response;
            },
            (error) => {
              console.log(error);
            }
        );
    }

    openDialog(): void {
        if ((this.data[0]['KONTOSTAND'] / this.price) < this.data[0]['KONTOSTAND'] && this.numberOfStocks > 0 ) {
            const dialogRef = this.dialog.open(BuyingDialogComponent, {
                data: {
                    allowed: true,
                    capital: this.data[0]['KONTOSTAND'],
                    price: this.price,
                    numberOfStocks: this.numberOfStocks,
                    stockSymbol: this.stockSymbol
                }
            });
            dialogRef.afterClosed().subscribe(result => {
                console.log('Dialog result: ' + result)
            });
        } else {
            const dialogRef = this.dialog.open(BuyingDialogComponent, {
                data: {
                    allowed: false,
                    capital: this.data[0]['KONTOSTAND'],
                    price: this.price,
                    numberOfStocks: this.numberOfStocks,
                    stockSymbol: this.stockSymbol
                }
            });
            dialogRef.afterClosed().subscribe(result => {
                console.log('Dialog result: ' + result)
            });
        }
    }

    openDialogMltp(): void {
        if ((this.data[0]['MLTP_KONTOSTAND'] / this.price) < this.data[0]['MLTP_KONTOSTAND'] && this.numberOfStocks > 0 ) {
            const dialogRef = this.dialog.open(BuyingDialogComponent, {
                data: {
                    allowed: true,
                    capital: this.data[0]['MLTP_KONTOSTAND'],
                    price: this.price,
                    numberOfStocks: this.numberOfStocks,
                    stockSymbol: this.stockSymbol
                }
            });
            dialogRef.afterClosed().subscribe(result => {
                console.log('Dialog result: ' + result)
            });
        } else {
            const dialogRef = this.dialog.open(BuyingDialogComponent, {
                data: {
                    allowed: false,
                    capital: this.data[0]['MLTP_KONTOSTAND'],
                    price: this.price,
                    numberOfStocks: this.numberOfStocks,
                    stockSymbol: this.stockSymbol
                }
            });
            dialogRef.afterClosed().subscribe(result => {
                console.log('Dialog result: ' + result)
            });
        }
    }
}
