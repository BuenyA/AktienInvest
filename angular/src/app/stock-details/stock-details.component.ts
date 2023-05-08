import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FluxTableMetaData, InfluxDB } from '@influxdata/influxdb-client'
import { MultiplayerAccountDataService } from '../services/multiplayer-services/multiplayer-account-data.service';

@Component({
    selector: 'app-stock-details',
    templateUrl: './stock-details.component.html',
    styleUrls: ['./stock-details.component.scss']
})
export class StockDetailsComponent implements OnInit {

    multiplayerMode: boolean;

    constructor(private route: ActivatedRoute, private http: HttpClient, private multiplayer: MultiplayerAccountDataService) { }

    @Input() tickersymbol: any;

    stockName: any;
    stockSymbol: any;
    stockExchange: any;

    dayHigh: number;
    dayLow: number;
    open: number;
    previousClose: number;
    price: number;
    yearHigh: number;
    yearLow: number;
    chgDol: number;
    chgPerc: number;

    ngOnInit(): void {
        this.multiplayerMode = this.multiplayer.multiplayerMode;
        this.route.paramMap.subscribe(params => {
            this.tickersymbol = params.get('symbol');
        });
        this.getNameSymbol();
        this.getStockData();
    }

    getNameSymbol() {
        this.http.get('http://localhost/api/v1/getStockNameSymbol/' + this.tickersymbol).subscribe(
            (response: any) => {
                this.stockName = response[0]['AKTIE_NAME'];
                this.stockExchange = response[0]['AKTIE_BOERSE'];
                this.stockSymbol = response[0]['AKTIE_TICKERSYMBOL'];
            },
            (error) => console.log(error)
        );
    }

    getStockData() {
        const queryApi = new InfluxDB({ url: 'http://127.0.0.1:8086/', token: 'bKewrAE7m1nq9-xtGdYzEtiXKxzYqax5Mc_xVMxCpiksndITqT1u68DSGg1Kx66yhWa8BWo7eigTufqIle5k1A==' }).getQueryApi('InfluxDbBroker');
        const fluxQuery = 'from(bucket:"stockcharts") |> range(start: 0) |> filter(fn: (r) => r._measurement == "' + this.tickersymbol + '") |> last()'

        queryApi.queryRows(fluxQuery, {
            next: (row: string[], tableMeta: FluxTableMetaData) => {
                const o = tableMeta.toObject(row);

                if(`${o['Kennzahl']}` == 'DayHigh') {
                    this.dayHigh = parseFloat(`${o['_value']}`);
                } else if (`${o['Kennzahl']}` == 'DayLow') {
                    this.dayLow = parseFloat(`${o['_value']}`);
                } else if (`${o['Kennzahl']}` == 'Open') {
                    this.open = parseFloat(`${o['_value']}`);
                } else if (`${o['Kennzahl']}` == 'PreviousClose') {
                    this.previousClose = parseFloat(`${o['_value']}`);
                } else if (`${o['Kennzahl']}` == 'Price') {
                    this.price = parseFloat(`${o['_value']}`);
                } else if (`${o['Kennzahl']}` == 'YearHigh') {
                    this.yearHigh = parseFloat(`${o['_value']}`);
                } else if (`${o['Kennzahl']}` == 'YearLow') {
                    this.yearLow = parseFloat(`${o['_value']}`);
                } else if (`${o['Kennzahl']}` == 'chgDol') {
                    this.chgDol = parseFloat(`${o['_value']}`);
                } else if (`${o['Kennzahl']}` == 'chgPerc') {
                    this.chgPerc = parseFloat(`${o['_value']}`);
                }
            },
            error: (error: Error) => {
                console.error(error)
                console.log('\nQueryRows ERROR')
            },
            complete: () => {
                console.log('\nQueryRows SUCCESS')
            },
        })
    }
}