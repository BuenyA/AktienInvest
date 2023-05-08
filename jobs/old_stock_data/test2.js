const Alpaca = require("@alpacahq/alpaca-trade-api");

API_KEY = "PKDU6Q8GMQC65QKCYQEO";
API_SECRET = "cd54e5S9tCYbXeNoOGcBCbEWcCK2yMYWzm2HNZ9o";

const alpaca = new Alpaca({
    keyId: API_KEY,
    secretKey: API_SECRET,
    paper: true,
});

const options = {
    start: new Date(new Date().setDate(new Date().getDate() - 1)), // 1 day ago
    end: new Date(), // Current date
    timeframe: "1Day",
};

/* alpaca.getAccount().then((account) => {
    console.log('Current Account:', account)
}) */

/* alpaca.getAccountConfigurations().then((account) => {
    console.log('Current Account:', account)
}) */

//Alle Wertpapiere
/* alpaca.getAssets().then((account) => {
    console.log('Current Account:', account)
}) */

//Ein bestimmtes Wertpapier
/* alpaca.getAsset('BMTLF').then((account) => {
    console.log('Current Account:', account)
})
 */

/* alpaca.getCalendar().then((account) => {
    console.log('Current Account:', account)
}) */

//Ist die Börse offen + Zeitstempel
/* alpaca.getClock().then((account) => {
    console.log('Current Account:', account)
})
 */
//Letzter Trade eines Wertpapiers
/* alpaca.getLatestTrade('NVDA').then((account) => {
    console.log('Current Account:', account)
}) */

//Die letzte Quote
/* alpaca.getLatestQuote('NVDA').then((account) => {
    console.log('Current Account:', account)
})
 */

/* alpaca.getNews('TSLA').then((account) => {
    console.log('Current Account:', account)
}) */

/* ---------------------------------------------------------------------------------------- */

//Ist die Börse offen + Zeitstempel
/* alpaca.getLatestBar('AMZN').then((account) => {
    console.log('Current Account:', account)
}) */

/* alpaca.getLatestTrade('TLSA').then((account) => {
    console.log('Current Account:', account)
}) */

/* alpaca.getAsset('AMZN').then((account) => {
    console.log('Current Account:', account)
}) */
    
/* alpaca.getLatestQuote('AAPL').then((account) => {
    console.log('Current Account:', account)
}) */

const stocks = ["AAPL", "APC.DE", "AMZN"];

/* alpaca.getLatestQuotes(stocks).then((account) => {
    console.log('Current Account:', account)
}) */

console.log('----')

alpaca.getLatestTrade("AAPL").then((account) => {
    console.log('Current Account:', account)
})

/* alpaca.getAssets().then((account) => {
    console.log('Current Account:', account)
}) */

/* alpaca.getAsset('MBTF').then((account) => {
    console.log('Current Account:', account)
}) */

/* alpaca.getAssets().then((account) => {
    console.log('Current Account:', account)
}) */

/* ------------------------------------------------------------------------------------------ */

/* --------------------------- KRYPTO --------------------------- */

/* async function getHistoricalBars(symbol) {
    let bars = [];
    let resp = alpaca.getCryptoBars(symbol, options);
    for await (let bar of resp) {
        bars.push(bar);
    }
    return bars;
}

symbol = "BTCUSD";
barsPromise = getHistoricalBars(symbol);
barsPromise.then((bars) =>
    bars.forEach((bar) => {
        console.log(bar);
    })
); */