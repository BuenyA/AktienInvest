'use strict';
var request = require('request');
var fs = require('fs');

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=APC.FRK&apikey=00AGJN393OV291XF';

request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      fs.writeFile( 'DeineMama.txt', JSON.stringify(data), (err) => {
        if (err) throw err;
      })
      console.log(data);
    }
});