const Alpaca = require("@alpacahq/alpaca-trade-api");

API_KEY = "PKDU6Q8GMQC65QKCYQEO";
API_SECRET = "cd54e5S9tCYbXeNoOGcBCbEWcCK2yMYWzm2HNZ9o";
const feed = "iex"; // Change to "sip" if on a paid plan
const symbol = "BTCUSD";

class DataStream {
    constructor({ apiKey, secretKey, feed, symbol }) {
      this.alpaca = new Alpaca({
        keyId: apiKey,
        secretKey,
        feed,
      });
  
      const socket = this.alpaca.crypto_stream_v2;
  
      socket.onConnect(function () {
        console.log("Connected");
        socket.subscribeForBars([symbol]);
      });
  
      socket.onError((err) => {
        console.log(err);
      });
  
      socket.onCryptoBar((bar) => {
        console.log(bar);
      });
  
      socket.onDisconnect(() => {
        console.log("Disconnected");
      });
  
      socket.connect();
    }
  }

let stream = new DataStream({
    apiKey: API_KEY,
    secretKey: API_SECRET,
    feed: feed,
    symbol: symbol,
    paper: true,
});