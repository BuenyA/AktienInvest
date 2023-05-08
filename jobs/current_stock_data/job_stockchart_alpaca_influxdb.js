const Alpaca = require("@alpacahq/alpaca-trade-api");
const { InfluxDB, Point } = require('@influxdata/influxdb-client');

API_KEY = "PKDU6Q8GMQC65QKCYQEO";
API_SECRET = "cd54e5S9tCYbXeNoOGcBCbEWcCK2yMYWzm2HNZ9o";

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

//Alpaca-API 
const alpaca = new Alpaca({
    keyId: API_KEY,
    secretKey: API_SECRET,
    paper: true,
});

const influxDB = new InfluxDB({
    url: 'http://127.0.0.1:8086', 
    token: 'u8wWoIfcwDx_2ySslZpW5a9V8mhmiDzA_056jdqq8nojjAO2HkGqKbA4Xte6y8VDKSnE292sieJSzGP14ItqCA=='
});

const writeApi = influxDB.getWriteApi('InfluxDbBroker', 'aktienchart');

//Aktueller Aktienkurs -> NUR WÄHREND DIE BÖRSE GEÖFFNET HAT!!!
alpaca.getLatestQuotes(stocks).then((latestQuote) => {
    console.log('Current Account:', latestQuote);

    latestQuote.forEach(element => {
        console.log(element['Symbol'])
        console.log(element['AskPrice'])
        const point = new Point(element['Symbol']).tag('Kennzahl', 'AskPrice').floatField('AskPrice', element['AskPrice']);
        writeApi.writePoint(point);
    });

    writeApi.close().then(() => {
        console.log('WRITE 1 FINISHED');
    });
})