const { InfluxDB, Point } = require('@influxdata/influxdb-client');

const influxDB = new InfluxDB({
    url: 'http://127.0.0.1:8086', 
    token: 'u8wWoIfcwDx_2ySslZpW5a9V8mhmiDzA_056jdqq8nojjAO2HkGqKbA4Xte6y8VDKSnE292sieJSzGP14ItqCA=='
});

//Definition which org and bucket
const writeApi = influxDB.getWriteApi('InfluxDbBroker', 'aktienchart');

const point1 = new Point('Kurs').tag('Kennzahl', 'Wert').floatField('value', 32);

writeApi.writePoint(point1);

writeApi.close().then(() => {
    console.log('WRITE FINISHED')
});