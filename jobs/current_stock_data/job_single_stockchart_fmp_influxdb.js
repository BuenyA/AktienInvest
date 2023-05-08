const fmp = require('financialmodelingprep')('b2e27b44c28bc5eaec58d3adf5233e69');
const { InfluxDB, Point } = require('@influxdata/influxdb-client');

const consoleLog = false;
 
const influxDB = new InfluxDB({
    url: 'http://127.0.0.1:8086', 
    token: 'bKewrAE7m1nq9-xtGdYzEtiXKxzYqax5Mc_xVMxCpiksndITqT1u68DSGg1Kx66yhWa8BWo7eigTufqIle5k1A=='
});

const interval = setInterval(function() {
    readWriteDataMore();
}, 5000);

function readWriteDataMore() {
    const writeApi = influxDB.getWriteApi('InfluxDbBroker', 'stockcharts');

    fmp.stock('AAPL').quote().then(response => {
        if(consoleLog == true) {
            console.log(response[0]['symbol']);
            console.log(response[0]['name']);
            console.log(response[0]['price']);
            console.log(response[0]['changesPercentage']); //Change of this day in %
            console.log(response[0]['change']); //Change of this day in $
            console.log(response[0]['dayLow']);
            console.log(response[0]['dayHigh']);
            console.log(response[0]['yearHigh']);
            console.log(response[0]['yearLow']);
            console.log(response[0]['exchange']);
            console.log(response[0]['open']);
            console.log(response[0]['previousClose']);
        }
        
    
        // const name = new Point('AAPL').tag('Kennzahl', 'Name').stringField('char', response[0]['name']);
        // const exchange = new Point('AAPL').tag('Kennzahl', 'Exchange').stringField('char', response[0]['exchange']);
        const price = new Point('AAPL').tag('Kennzahl', 'Price').floatField('value', response[0]['price']);
        const changesPercentage = new Point('AAPL').tag('Kennzahl', 'chgPerc').floatField('value', response[0]['changesPercentage']);
        const change = new Point('AAPL').tag('Kennzahl', 'chgDol').floatField('value', response[0]['change']);
        const dayLow = new Point('AAPL').tag('Kennzahl', 'DayLow').floatField('value', response[0]['dayLow']);
        const dayHigh = new Point('AAPL').tag('Kennzahl', 'DayHigh').floatField('value', response[0]['dayHigh']);
        // const yearHigh = new Point('AAPL').tag('Kennzahl', 'YearHigh').floatField('value', response[0]['yearHigh']);
        // const yearLow = new Point('AAPL').tag('Kennzahl', 'YearLow').floatField('value', response[0]['yearLow']);
        const open = new Point('AAPL').tag('Kennzahl', 'Open').floatField('value', response[0]['open']);
        const previousClose = new Point('AAPL').tag('Kennzahl', 'PreviousClose').floatField('value', response[0]['previousClose']);
    
        if(consoleLog == true) {
            console.log('Points gesetzt für: AAPL');
        }

        // writeApi.writePoint(name);
        // writeApi.writePoint(exchange);
        writeApi.writePoint(price);
        writeApi.writePoint(changesPercentage);
        writeApi.writePoint(change);
        writeApi.writePoint(dayLow);
        writeApi.writePoint(dayHigh);
        // writeApi.writePoint(yearHigh);
        // writeApi.writePoint(yearLow);
        writeApi.writePoint(open);
        writeApi.writePoint(previousClose);
    
        writeApi.close().then(() => {
            if(consoleLog == true) {
                console.log('WRITE FINISHED!!!');
            }
        });
    });
}