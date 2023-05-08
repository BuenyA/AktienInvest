var intrinioSDK = require('intrinio-sdk');
intrinioSDK.ApiClient.instance.authentications['ApiKeyAuth'].apiKey = "OmVkY2ZmYjVkNjEzNGU2YmE4Y2RkY2NlMDdmOTU1NmQz";
intrinioSDK.ApiClient.instance.enableRetries = true;

var stockExchange = new intrinioSDK.StockExchangeApi();

var identifier = "USCOMP";


var opts = { 
  'source': null,
  'activeOnly': null,
  'pageSize': 100,
  'nextPage': null
};

stockExchange.getStockExchangeRealtimePrices(identifier, opts).then(function(data) {
  data = JSON.stringify(data, null, 2)
  console.log(data);
}, function(error) {
  console.error(error);
});
