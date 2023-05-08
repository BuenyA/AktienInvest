const fmp = require('financialmodelingprep')('b2e27b44c28bc5eaec58d3adf5233e69');
const { InfluxDB, Point } = require('@influxdata/influxdb-client');

const consoleLog = true;

const stocks = ["AAPL", "ADBE", "ADI", "ADP", "ADSK", "ALGN", "AMAT", 
                "AMD", "AMGN", "AMZN", "ANSS", "ASML", "ATVI", "AVGO", "BIDU", "BIIB", 
                "BKNG", "CDNS", "CDW", "CERN", "CGEN", "CHKP", "CHTR", "CMCSA", "CME", 
                "COST", "CPRT", "CRM", "CRWD", "CTAS", "CSCO", "CTSH", "DLTR", "DOCU", 
                "DXCM", "EA", "EBAY", "EXC", "FAST", "FB", "FISV", "FOXA", "FOX", "GILD", 
                "GOOGL", "GOOG", "IDXX", "ILMN", "INTC", "INTU", "ISRG", "JD", "KDP", "KHC", 
                "KLAC", "LBTYA", "LBTYK", "LRCX", "LULU", "MAR", "MCHP", "MDLZ", "MELI", "MNST", 
                "MRNA", "MSFT", "MU", "MXIM", "NFLX", "NTES", "NVDA", "NXPI", "ORLY", "PAYX", 
                "PCAR", "PDD", "PEP", "PTON", "PYPL", "QCOM", "REGN", "ROST", "SBUX", "SGEN", 
                "SNPS", "SPLK", "SWKS", "TCHEY", "TMUS", "TSLA", "TXN", "VRSK", "VRSN", "VRTX", 
                "WBA", "WDAY", "XEL", "XLNX", "ZM"];

const stocks2 = ["AMZN", "PYPL", "SAP", "AAPL", "BAYRY", "TSLA", "DLAKY", "VLKAF", "BASFY", "ALIZF"]

const influxDB = new InfluxDB({
    // url: 'http://influxdb:8086',
    url: 'http://127.0.0.1:8086',
    token: 'bKewrAE7m1nq9-xtGdYzEtiXKxzYqax5Mc_xVMxCpiksndITqT1u68DSGg1Kx66yhWa8BWo7eigTufqIle5k1A=='
});

/* const interval = setInterval(function() {
    readWriteDataMore();
}, 120000); */

const interval = setInterval(function() {
    readWriteDataMore();
}, 5000);

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

            // const name = new Point(element['symbol']).tag('Kennzahl', 'Name').stringField('char', element['name']);
            // const exchange = new Point(element['symbol']).tag('Kennzahl', 'Exchange').stringField('char', element['exchange']);
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

            // writeApi.writePoint(name);
            // writeApi.writePoint(exchange);
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