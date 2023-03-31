const { InfluxDB } = require('@influxdata/influxdb-client');

const queryApi = new InfluxDB({url: 'http://127.0.0.1:8086/', token: 'u8wWoIfcwDx_2ySslZpW5a9V8mhmiDzA_056jdqq8nojjAO2HkGqKbA4Xte6y8VDKSnE292sieJSzGP14ItqCA=='}).getQueryApi("InfluxDbBroker")

// const fluxQuery = 'from(bucket:"aktienchart") |> range(start: 0) |> filter(fn: (r) => r._measurement == "AAPL")'

const fluxQuery =
  'from(bucket: "aktienchart")\
    |> range(start: 0)\
    |> filter(fn: (r) => r._measurement == "AAPL")'


const observer = ({
    next(row, tableMeta) {
        const o = tableMeta.toObject(row)
        console.log(
        `${o._time} ${o._measurement} in '${o.location}' (${o.sensor_id}): ${o._field}=${o._value}`
        )
    }
}) 

// queryApi.queryRows(fluxQuery, observer);

queryApi.queryRows(fluxQuery, {
    next(row, tableMeta) {
      const o = tableMeta.toObject(row)
      console.log(o)
      console.log(
        `${o._time} ${o._measurement} in '${o.location}' (${o.sensor_id}): ${o._field}=${o._value}`
        )
    },
    error(error) {
    console.error(error)
      console.log('\nFinished ERROR')
    },
    complete() {
      console.log('\nFinished SUCCESS')
    },
});