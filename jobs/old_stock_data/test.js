'use strict';
var request = require('request');
const { InfluxDB, Point } = require('@influxdata/influxdb-client');

const consoleLog = true;

const stocks2 = ["AMZN", "PYPL", "SAP", "AAPL", "BAYRY", "TSLA", "DLAKY", "VLKAF", "BASFY", "ALIZF"]
// const stocks2 = ["AMZN"]

const influxDB = new InfluxDB({
    url: 'http://127.0.0.1:8086', 
    token: 'bKewrAE7m1nq9-xtGdYzEtiXKxzYqax5Mc_xVMxCpiksndITqT1u68DSGg1Kx66yhWa8BWo7eigTufqIle5k1A=='
});

const writeApi = influxDB.getWriteApi('InfluxDbBroker', 'stockdata-middle-term');

const interval = setInterval(function() {
    readWriteDataMore();
}, 5000);

function readWriteDataMore() {

    const date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var currentDate = '';

    console.log(date)

    console.log("Day: " + day + ", Month: " + month + ", Year: " + year)

    stocks2.forEach(element => {
        var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=' + element + '&apikey=00AGJN393OV291XF';
        console.log(url)
        request.get({
            url: url,
            json: true,
            headers: { 'User-Agent': 'request' }
        }, (err, res, data) => {
            if (err) {
                console.log('Error:', err);
            } else if (res.statusCode !== 200) {
                console.log('Status:', res.statusCode);
            } else {
                for (let index = 0; index < Object.keys(data['Time Series (Daily)']).length; index++) {
                    if(day > 1) {
                        day = day - 1;
                    } else if (month > 1) {
                        month = month - 1;
                        if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
                            day = 31
                        } else if (month == 2) {
                            if(year % 4 == 0) {
                                day = 29;
                            } else {
                                day = 28;
                            }
                        } else {
                            day = 30;
                        }
                    } else {
                        month = 12;
                        year = year - 1;
                    }

                    if(month < 10) {
                        console.log(year + "-0" + month + "-" + day)
                        // console.log(data['Time Series (Daily)'][year + "-0" + month + "-" + day])
                        currentDate = year + "-0" + month + "-" + day;
                    } else {
                        console.log(year + "-" + month + "-" + day)
                        // console.log(data['Time Series (Daily)'][year + "-" + month + "-" + day])
                        currentDate = year + "-" + month + "-" + day;
                    }

                    if(data['Time Series (Daily)'][currentDate] != undefined) {
                        // console.log(data['Time Series (Daily)'][currentDate]['4. close'])
                        const influxData = new Point(element).tag('Date', currentDate).floatField('value', data['Time Series (Daily)'][currentDate]['4. close']);
                        writeApi.writePoint(influxData);
                    }                    
                }
                writeApi.close().then(() => {
                    if(consoleLog == true) {
                        console.log('WRITE FINISHED!!!');
                    }
                });
            }
        });
    });
}