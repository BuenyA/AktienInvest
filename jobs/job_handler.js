const fmp = require('financialmodelingprep')('b2e27b44c28bc5eaec58d3adf5233e69');
const { InfluxDB, Point } = require('@influxdata/influxdb-client');

const consoleLog = true;

// First Job Call -> Writes current stock data to influxdb
const date = new Date;

const stocks2 = ["AMZN", "PYPL", "SAP", "AAPL", "BAYRY", "TSLA", "DLAKY", "VLKAF", "BASFY", "ALIZF"]

const influxDB = new InfluxDB({
    // url: 'http://127.0.0.1:8086',
    url: 'http://influxdb:8086',
    token: 'bKewrAE7m1nq9-xtGdYzEtiXKxzYqax5Mc_xVMxCpiksndITqT1u68DSGg1Kx66yhWa8BWo7eigTufqIle5k1A=='
});

const interval = setInterval(function() {
    callCurrentData();
}, 60000);

function callCurrentData() {
    if (date.getHours() == 13 && date.getMinutes() >= 30) {
        console.log('Exchange Active');
        readWriteDataMore();
        // const test = require('./current_stock_data/job_multiple_stockchart_fmp_influxdb')
        // readWriteDataMore();
    } else if (date.getHours() > 13 && date.getHours() < 20) {
        console.log('Exchange Active');
        readWriteDataMore();
        // const test = require('./current_stock_data/job_multiple_stockchart_fmp_influxdb')
        // test.readWriteDataMore();
    } else {
        console.log('Exchange Inactive');
        readWriteDataMore();
    }
}

function readWriteDataMore() {
    const writeApi = influxDB.getWriteApi('InfluxDbBroker', 'stockcharts');

    fmp.stock(stocks2).quote().then(response => {
        response.forEach(element => {
            if(consoleLog == true) {
                console.log(element['symbol']);
                console.log(element['symbol']);
                console.log(element['name']);
                console.log(element['price']);
                console.log(element['changesPercentage']); //Change of this day in %
                console.log(element['change']); //Change of this day in $
                console.log(element['dayLow']);
                console.log(element['dayHigh']);
                console.log(element['yearHigh']);
                console.log(element['yearLow']);
                console.log(element['exchange']);
                console.log(element['open']);
                console.log(element['previousClose']);
            }

            const price = new Point(element['symbol']).tag('Kennzahl', 'Price').floatField('value', element['price']);
            const changesPercentage = new Point(element['symbol']).tag('Kennzahl', 'chgPerc').floatField('value', element['changesPercentage']);
            const change = new Point(element['symbol']).tag('Kennzahl', 'chgDol').floatField('value', element['change']);
            const dayLow = new Point(element['symbol']).tag('Kennzahl', 'DayLow').floatField('value', element['dayLow']);
            const dayHigh = new Point(element['symbol']).tag('Kennzahl', 'DayHigh').floatField('value', element['dayHigh']);
            const yearHigh = new Point(element['symbol']).tag('Kennzahl', 'YearHigh').floatField('value', element['yearHigh']);
            const yearLow = new Point(element['symbol']).tag('Kennzahl', 'YearLow').floatField('value', element['yearLow']);
            const open = new Point(element['symbol']).tag('Kennzahl', 'Open').floatField('value', element['open']);
            const previousClose = new Point(element['symbol']).tag('Kennzahl', 'PreviousClose').floatField('value', element['previousClose']);
        
            if(consoleLog == true) {
                console.log('Points gesetzt für: ' + element['symbol']);
            }

            writeApi.writePoint(price);
            writeApi.writePoint(changesPercentage);
            writeApi.writePoint(change);
            writeApi.writePoint(dayLow);
            writeApi.writePoint(dayHigh);
            writeApi.writePoint(yearHigh);
            writeApi.writePoint(yearLow);
            writeApi.writePoint(open);
            writeApi.writePoint(previousClose);
        });
        writeApi.close().then(() => {
            if(consoleLog == true) {
                console.log('WRITE FINISHED!!!');
            }
        });
    });
}