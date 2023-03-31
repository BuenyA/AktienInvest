const Alpaca = require("@alpacahq/alpaca-trade-api");

API_KEY = "PKDU6Q8GMQC65QKCYQEO";
API_SECRET = "cd54e5S9tCYbXeNoOGcBCbEWcCK2yMYWzm2HNZ9o";
symbol = "BTCUSD";

/* const options = {
    keyId: API_KEY,
    secretKey: API_SECRET,
    paper: true,
};

const alpaca = new Alpaca(options); */

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

/* alpaca.getLatestCryptoTrade(symbol, options).then((latestQuote) => {
    console.log('Current Account:', latestQuote);
}); */

async function getHistoricalBars(symbol) {
    let bars = [];
    let resp = alpaca.getCryptoBars(symbol, options);
    for await (let bar of resp) {
        bars.push(bar);
    }
    return bars;
}

barsPromise = getHistoricalBars(symbol);
barsPromise.then((bars) =>
    bars.forEach((bar) => {
        console.log(bar);
    })
);