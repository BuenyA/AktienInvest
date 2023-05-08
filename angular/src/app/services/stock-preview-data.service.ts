import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { FluxTableMetaData, InfluxDB } from '@influxdata/influxdb-client';
import { Observable, retry } from 'rxjs';

export interface PeriodicElement {
    logo: string;
    symbol: string;
    number: number;
    price: number;
    trend: number;
}

export interface PeriodicElement1 {
    logo: string;
    symbol: string;
    number: number;
    price: number;
    buyed: string;
    selled: string;
}

export interface PeriodicElement2 {
    name: string;
    logo: string;
    symbol: string;
    price: number;
    trend: number;
}

const stocks = ['AMZN', 'PYPL', 'SAP', 'AAPL', 'BAYRY', 'TSLA', 'DLAKY', 'VLKAF', 'BASFY', 'ALIZF']

const queryApi = new InfluxDB({ url: 'http://127.0.0.1:8086/', token: 'bKewrAE7m1nq9-xtGdYzEtiXKxzYqax5Mc_xVMxCpiksndITqT1u68DSGg1Kx66yhWa8BWo7eigTufqIle5k1A==' }).getQueryApi('InfluxDbBroker');

@Injectable({
    providedIn: 'root'
})
export class StockPreviewDataService {

    constructor(private http: HttpClient) { }

    getOwnStockRows(): Observable<any> {
        return this.http.get<any[]>('http://localhost/api/v1/getOwnStocks', { withCredentials: true })
    }

    getMltpOwnStockRows(): Observable<any> {
        return this.http.get<any[]>('http://localhost/api/v1/getMltpOwnStocks', { withCredentials: true })
    }

    getOwnTransactionRows(): Observable<any> {
        return this.http.get<any[]>('http://localhost/api/v1/getOwnTransactions', { withCredentials: true })
    }

    getMltpOwnTransactionRows(): Observable<any> {
        return this.http.get<any[]>('http://localhost/api/v1/getMltpOwnTransactions', { withCredentials: true })
    }

    async getOwnTransactions(): Promise<any> {
        return new Promise((resolve, reject) => {
            var dataSource: PeriodicElement1[] = []
            var showCounter: number = 0;
            var allDataSelected = false;
            var ownTableData: any[];
            this.getOwnTransactionRows().subscribe(
                (response: any[]) => {
                    if (Object.keys(response).length == 0) {
                        resolve(dataSource);
                    } else {
                        ownTableData = response;
                        for (let index = 0; index < Object.keys(ownTableData).length; index++) {
                            this.getStockData(ownTableData[index]['AKTIE_SYMBOL']).then(data => {
                                if (ownTableData[index]['AKTIE_ANZAHL'] != 0) {
                                    if (ownTableData[index]['GEKAUFT_AM'] != null) {
                                        dataSource.push({ logo: 'assets/images/company_logos/' + ownTableData[index]['AKTIE_SYMBOL'] + '.png', symbol: '' + ownTableData[index]['AKTIE_SYMBOL'] + '', number: ownTableData[index]['AKTIE_ANZAHL'], price: Number(parseFloat("" + data.price * ownTableData[index]['AKTIE_ANZAHL'] + "").toFixed(2)), buyed: "" + ownTableData[index]['GEKAUFT_AM'].replace("T", " / ").replace(".000Z", "") + "", selled: "-" });
                                    } else {
                                        dataSource.push({ logo: 'assets/images/company_logos/' + ownTableData[index]['AKTIE_SYMBOL'] + '.png', symbol: '' + ownTableData[index]['AKTIE_SYMBOL'] + '', number: ownTableData[index]['AKTIE_ANZAHL'], price: Number(parseFloat("" + data.price * ownTableData[index]['AKTIE_ANZAHL'] + "").toFixed(2)), buyed: "-", selled: "" + ownTableData[index]['VERKAUFT_AM'].replace("T", " / ").replace(".000Z", "") + "" });
                                    }
                                }
                                showCounter++;
                                allDataSelected = (showCounter) >= Object.keys(ownTableData).length;
                                if (allDataSelected) {
                                    resolve(dataSource);
                                }
                            }).catch(error => {
                                console.error(error);
                                reject(error);
                            });
                        }
                    }
                },
                (error) => {
                    console.log(error);
                    reject(error);
                }
            );
        });
    }

    async getMltpOwnTransactions(): Promise<any> {
        return new Promise((resolve, reject) => {
            var dataSource: PeriodicElement1[] = []
            var showCounter: number = 0;
            var allDataSelected = false;
            var ownTableData: any[];
            this.getMltpOwnTransactionRows().subscribe(
                (response: any[]) => {
                    if (Object.keys(response).length == 0) {
                        resolve(dataSource);
                    } else {
                        ownTableData = response;
                        for (let index = 0; index < Object.keys(ownTableData).length; index++) {
                            this.getStockData(ownTableData[index]['AKTIE_SYMBOL']).then(data => {
                                if (ownTableData[index]['AKTIE_ANZAHL'] != 0) {
                                    if (ownTableData[index]['GEKAUFT_AM'] != null) {
                                        dataSource.push({ logo: 'assets/images/company_logos/' + ownTableData[index]['AKTIE_SYMBOL'] + '.png', symbol: '' + ownTableData[index]['AKTIE_SYMBOL'] + '', number: ownTableData[index]['AKTIE_ANZAHL'], price: Number(parseFloat("" + data.price * ownTableData[index]['AKTIE_ANZAHL'] + "").toFixed(2)), buyed: "" + ownTableData[index]['GEKAUFT_AM'].replace("T", " / ").replace(".000Z", "") + "", selled: "-" });
                                    } else {
                                        dataSource.push({ logo: 'assets/images/company_logos/' + ownTableData[index]['AKTIE_SYMBOL'] + '.png', symbol: '' + ownTableData[index]['AKTIE_SYMBOL'] + '', number: ownTableData[index]['AKTIE_ANZAHL'], price: Number(parseFloat("" + data.price * ownTableData[index]['AKTIE_ANZAHL'] + "").toFixed(2)), buyed: "-", selled: "" + ownTableData[index]['VERKAUFT_AM'].replace("T", " / ").replace(".000Z", "") + "" });
                                    }
                                }
                                showCounter++;
                                allDataSelected = (showCounter) >= Object.keys(ownTableData).length;
                                if (allDataSelected) {
                                    resolve(dataSource);
                                }
                            }).catch(error => {
                                console.error(error);
                                reject(error);
                            });
                        }
                    }
                },
                (error) => {
                    console.log(error);
                    reject(error);
                }
            );
        });
    }

    async getOwnStocks(): Promise<any> {
        return new Promise((resolve, reject) => {
            var dataSource: PeriodicElement[] = []
            var showCounter: number = 0;
            var allDataSelected = false;
            var ownTableData: any[];
            this.getOwnStockRows().subscribe(
                (response: any[]) => {
                    if (Object.keys(response).length == 0) {
                        resolve(dataSource);
                    } else {
                        ownTableData = response;                    
                        for (let index = 0; index < Object.keys(ownTableData).length; index++) {
                            this.getStockData(ownTableData[index]['AKTIE_SYMBOL']).then(data => {
                                if (ownTableData[index]['AKTIE_ANZAHL'] != 0) {
                                    dataSource.push({ logo: 'assets/images/company_logos/' + ownTableData[index]['AKTIE_SYMBOL'] + '.png', symbol: '' + ownTableData[index]['AKTIE_SYMBOL'] + '', number: ownTableData[index]['AKTIE_ANZAHL'], price: Number(parseFloat(data.price).toFixed(2)), trend: Number(parseFloat(data.trend).toFixed(2)) });
                                }
                                showCounter++;
                                allDataSelected = (showCounter) >= Object.keys(ownTableData).length;
                                if (allDataSelected) {
                                    resolve(dataSource);
                                } else if (data.price == undefined) {
                                }
                            }).catch(error => {
                                console.error(error);
                                reject(error);
                            });
                        }
                    }
                    
                },
                (error) => {
                    console.log(error);
                    reject(error);
                }
            );
        });
    }

    async getMltpOwnStocks(): Promise<any> {
        return new Promise((resolve, reject) => {
            var dataSource: PeriodicElement[] = []
            var showCounter: number = 0;
            var allDataSelected = false;
            var ownTableData: any[];
            this.getMltpOwnStockRows().subscribe(
                (response: any[]) => {
                    if (Object.keys(response).length == 0) {
                        resolve(dataSource);
                    } else {
                        ownTableData = response;                    
                        for (let index = 0; index < Object.keys(ownTableData).length; index++) {
                            this.getStockData(ownTableData[index]['AKTIE_SYMBOL']).then(data => {
                                if (ownTableData[index]['AKTIE_ANZAHL'] != 0) {
                                    dataSource.push({ logo: 'assets/images/company_logos/' + ownTableData[index]['AKTIE_SYMBOL'] + '.png', symbol: '' + ownTableData[index]['AKTIE_SYMBOL'] + '', number: ownTableData[index]['AKTIE_ANZAHL'], price: Number(parseFloat(data.price).toFixed(2)), trend: Number(parseFloat(data.trend).toFixed(2)) });
                                }
                                showCounter++;
                                allDataSelected = (showCounter) >= Object.keys(ownTableData).length;
                                if (allDataSelected) {
                                    resolve(dataSource);
                                } else if (data.price == undefined) {
                                }
                            }).catch(error => {
                                console.error(error);
                                reject(error);
                            });
                        }
                    }
                    
                },
                (error) => {
                    console.log(error);
                    reject(error);
                }
            );
        });
    }

    async getBuyingStockData(stockSymbol: string, numberOfStocks: number): Promise<any> {
        return new Promise((resolve, reject) => {
            var dataSource: PeriodicElement[] = []
            var allDataSelected = false;
            this.getStockData(stockSymbol).then(data => {
                dataSource.push({ logo: 'assets/images/company_logos/' + stockSymbol + '.png', symbol: '' + stockSymbol + '', number: numberOfStocks, price: Number(parseFloat(data.price).toFixed(2)), trend: Number(parseFloat(data.trend).toFixed(2)) });
                allDataSelected = true;
                if (allDataSelected) {
                    resolve(dataSource);
                }
            });
        })
    }

    async getPreviewStockData(): Promise<any> {
        return new Promise((resolve, reject) => {
            var dataSource: PeriodicElement2[] = []
            var showCounter: number = 0;
            var allDataSelected = false;
            stocks.forEach(element => {
                this.getStockData(element).then(data => {
                    dataSource.push({ name: data['name'], logo: 'assets/images/company_logos/' + element + '.png', symbol: '' + element + '', price: Number(parseFloat(data.price).toFixed(2)), trend: Number(parseFloat(data.trend).toFixed(2)) });
                    showCounter++;
                    allDataSelected = (showCounter) >= stocks.length;
                    if (allDataSelected) {
                        resolve(dataSource);
                    }
                }).catch(error => {
                    console.error(error);
                    reject(error);
                });
            });
        })
    }

    async getStockData(symbol: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            var stockPrice = 0;
            var chgStockPerc = 0;
            const fluxQuery = 'from(bucket: "stockcharts") |> range(start: 0) |> filter(fn: (r) => r["_measurement"] == "' + symbol + '") |> filter(fn: (r) => r["Kennzahl"] == "Price" or r["Kennzahl"] == "chgPerc") |> filter(fn: (r) => r["_field"] == "value") |> last()'
            this.http.get<any[]>('http://localhost/api/v1/getStockName/' + symbol, { withCredentials: true }).subscribe(data => {
                queryApi.queryRows(fluxQuery, {
                    next: (row: string[], tableMeta: FluxTableMetaData) => {
                        const o = tableMeta.toObject(row);
                        if (`${o['Kennzahl']}` == 'Price') {
                            stockPrice = parseFloat(`${o['_value']}`);
                        } else if (`${o['Kennzahl']}` == 'chgPerc') {
                            chgStockPerc = parseFloat(`${o['_value']}`);
                        }
                    },
                    error: (error: Error) => {
                        console.error(error);
                        console.log('\nQueryRows ERROR');
                        reject(error);
                    },
                    complete: () => {
                        resolve({ name: data[0]['AKTIE_NAME'], price: stockPrice, trend: chgStockPerc });
                    },
                })
            })
        });
    }
}