# Verteilte Systeme
Dies ist das Repository, für die Vorlesung: Verteilte Systeme.

# Architektur
-> Hier kann der erste Entwurf der Architektur dokumentiert werden

# Umsetzung
Für die Umsetzung der Architektur wird das Angular Framework genutzt.
Des weiteren werden Webentwicklungssprachen wie HTML, SCSS und TypeScript verwendet.

# Datenbank MariaDB
User: aktieninvestuser
Password: aktieninvestpass

# Datenbank InfluxDB
User: homeassistant
Password: influxhapassword

# Alpaca API-Account
Benutzername: Bünymamin Aydemir
E-Mail: aydemir.buny@gmail.com
Passwort: (AktienBrokerAPI2023)
API-Schlüssel: CKCD1RJR4I1UANWMYBDI
api_secret: cGrGgcyinPjUmNoS6d0J7VliuTPehO7IjFpCYk7L
Sandbox-API-URL: "https://broker-api.sandbox.alpaca.markets/"

# Installation
1. Allgemeine Installationen
    1. Node.js installieren
    2. Angular installieren                   -> npm install -g @angular/cli
    3. TypeScript installieren                -> npm install typescript

2. Angular Installationen
    1. Chart.js installieren                  -> npm install chart.js
    2. Chart.js installieren                  -> npm install ng-apexcharts
    3. Angular Material installieren          -> ng add @angular/material
    4. Bootstrap installieren                 -> ng add @ng-bootstrap/ng-bootstrap
    5. FormsModule installieren               -> ng add @angular/forms
    6. Material Timepicker installieren       -> npm install ngx-material-timepicker
    7. Install InfluxDB Lib                   -> npm install --save @influxdata/influxdb-client
    8. Install InfluxDB Lib Management APIs   -> npm install --save @influxdata/influxdb-client-apis

3. Install server_db
    1. Installieren von Alpaca-API            -> npm install --save @alpacahq/alpaca-trade-api

# Hilfe Befehle für Angular, TypeScript, ...
1. tsc dateiname.ts -> Konvertieren von TypeScript in JavaScript
2. ng new projektname -> Create Angular Projekt
3. ng serve --open -> Öffnet die Angular Anwendung
4. ng g c "Komponentenname" -> Generiert Komponenete -> g = generate, c = component
5. *ngIf="true/false" -> Fallunterscheidung
6. *ngFor="let i of [0, 1, ...]" -> For-Schleife
