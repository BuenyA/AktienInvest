import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SellingDialogComponent } from './selling-dialog/selling-dialog.component';
import { GetAccountDataService } from 'src/app/services/get-account-data.service';
import { MultiplayerAccountDataService } from 'src/app/services/multiplayer-services/multiplayer-account-data.service';

@Component({
    selector: 'app-stock-details-selling',
    templateUrl: './stock-details-selling.component.html',
    styleUrls: ['./stock-details-selling.component.scss']
})
export class StockDetailsSellingComponent implements OnInit {

    constructor(private http: HttpClient, public dialog: MatDialog, private getAccDataService: GetAccountDataService, private multiplayer: MultiplayerAccountDataService) { }

    @Input() price: number;
    @Input() stockSymbol: string;
    
    hide = true;
    numberOfStocks: number = 0;
    numberOfOwnStocks: number = 0;
    sellAvailable: boolean = true;

    data: any[];

    multiplayerMode: boolean = false;

    ngOnInit(): void {
        this.multiplayerMode = this.multiplayer.multiplayerMode;
        if (this.multiplayerMode) {
            this.getMltpNumberOfStocks();
            console.log('MLTP1')
        } else {
            this.getNumberOfStocks();
        }
        this.getAccDataService.getAccountData().subscribe(
            (response: any[]) => {
              this.data = response;
            },
            (error) => {
              console.log(error);
            }
        );
    }

    async getNumberOfStocks() {
        await new Promise(resolve => setTimeout(resolve, 100)); // Wait a second to make sure that this.stockSymbol was set
        this.http.get<any[]>('http://localhost/api/v1/getOwnStockNumber/' + this.stockSymbol, { withCredentials: true }).subscribe(data => {
            this.numberOfOwnStocks = data[0]['numberOfStocks']
            if (this.numberOfOwnStocks > 0) {
                this.sellAvailable = false;
            } else {
            }
        }, (error) => {
            console.log('Fehler:', error);
        });
    }

    async getMltpNumberOfStocks() {
        await new Promise(resolve => setTimeout(resolve, 100)); // Wait a second to make sure that this.stockSymbol was set
        this.http.get<any[]>('http://localhost/api/v1/getMltpOwnStockNumber/' + this.stockSymbol, { withCredentials: true }).subscribe(data => {
            this.numberOfOwnStocks = data[0]['numberOfStocks']
            console.log(this.numberOfOwnStocks)
            if (this.numberOfOwnStocks > 0) {
                this.sellAvailable = false;
            } else {
            }
        }, (error) => {
            console.log('Fehler:', error);
        });
    }

    openDialog(): void {
        if (this.numberOfOwnStocks >= this.numberOfStocks && this.numberOfStocks > 0) {
            const dialogRef = this.dialog.open(SellingDialogComponent, {
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
            const dialogRef = this.dialog.open(SellingDialogComponent, {
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
        if (this.numberOfOwnStocks >= this.numberOfStocks && this.numberOfStocks > 0) {
            const dialogRef = this.dialog.open(SellingDialogComponent, {
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
            const dialogRef = this.dialog.open(SellingDialogComponent, {
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