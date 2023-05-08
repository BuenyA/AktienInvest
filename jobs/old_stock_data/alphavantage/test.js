const { IEXCloudClient } = require("node-iex-cloud");
const fetch = require("node-fetch");

const iex = new IEXCloudClient(fetch, {
  sandbox: true,
  publishable: "pk_541537b556704cfb8d6468519f215ac5",
  version: "stable"
});

iex
  .symbol("aapl")
  .cashFlow("annual", 3)
  .then(res => console.log(res));