# Verteilte Systeme
Dies ist die neuste Version der Webanwendung und basiert auf dem alten Repository: https://github.com/BuenyA/Verteilte-Systeme

## Angular Container
In dem Angular befindet sich die Frontendanwendung. Sie wird mit nginx deployt.

## InfluxDB Container
In dem Container InfluxDB befindet sich die Timeseries DB "InfluxDB".
In ihr werden alle Echtzeitdaten der Aktien gespeichert.

## Jobs Container
Dieser Container beinhaltet einen Job, der alle 30 Sekunden ausgeführt wird.
Er sorgt dafür, dass sich immer die aktuellsten Daten zu den Aktien in der InfluxDB befinden.

## Loadbalancer Container
Dient der Skalierung der Server Container.

# Anmeldedaten
Im Folgenden werden alle Daten aufgelistet, die für sämtliche Anmeldungen benötigt werden.

## Datenbank MariaDB
User: aktieninvestuser<br>
Password: aktieninvestpass

## Datenbank InfluxDB
Org: InfluxDbBroker<br>
User: homeassistant<br>
Password: influxhapassword<br>
API-Token: bKewrAE7m1nq9-xtGdYzEtiXKxzYqax5Mc_xVMxCpiksndITqT1u68DSGg1Kx66yhWa8BWo7eigTufqIle5k1A==

# Verwendete Libraries
In der Anwendung wurden die folgenden Libraries verwendet:
1.  @angular/cli
2.  typescript
3.  chart.js
4.  ng-apexcharts
5.  @angular/material
6.  @ng-bootstrap/ng-bootstrap
7.  @angular/forms
8.  ngx-material-timepicker
9.  @influxdata/influxdb-client
10. @influxdata/influxdb-client-apis
11. ngx-cookie-service
12. cookie-parser
13. bcryptjs
14. jsonwebtoken
15. financialmodelingprep
16. cors
17. node-iex-cloud

# Broker APIs

## Financial Modeling Grep
API-KEY: rw4c9JJFNj7CePnMipMhmmEWQvwGS1gR<br>
API-KEY-2: b2e27b44c28bc5eaec58d3adf5233e69 

## Alphavantage Stocks API
API-Key: 00AGJN393OV291XF<br>
API-Key2: AQH49S75QIV567UX<br>
API-Key3: SU72L7HX572TSHAS

### Alpaca Broker-API-Account
API-Schlüssel: CKCD1RJR4I1UANWMYBDI<br>
API-SECRET: cGrGgcyinPjUmNoS6d0J7VliuTPehO7IjFpCYk7L<br>
API-Schlüssel: PKDU6Q8GMQC65QKCYQEO<br>
API-SECRET: cd54e5S9tCYbXeNoOGcBCbEWcCK2yMYWzm2HNZ9o