const alpha = require('alphavantage')({ key: 'AQH49S75QIV567UX' });

const stocks2 = [`AMZN`, `PYPL`, `SAP`, `AAPL`, `BAYRY`, `TSLA`, `DLAKY`, `VLKAF`, `BASFY`, `ALIZF`]

alpha.data.quote(stocks2).then((data) => {
    console.log(data);
});