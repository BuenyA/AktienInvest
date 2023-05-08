'use strict';

const express = require('express');

// CORS handling package, to allow http requests for the client
const cors = require('cors');

//bcrypt password-hashing (server-sided)
const bcrypt = require('bcryptjs');
const saltRounds = 10;

// JWT + cookie-parser
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

// Database MariaDB
const mysql = require('mysql');

// Import Libary InfluxDB
const { InfluxDB } = require('@influxdata/influxdb-client');

// Database connection info (MariaDB) - used from environment variables
var dbInfo = {
    connectionLimit: 10,
    host: process.env.MYSQL_HOSTNAME,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
};

var connection = mysql.createPool(dbInfo);
console.log("Conecting to database...");

// Check the connection   // 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error; // <- this will throw the error and exit normally
    // check the solution - should be 2
    if (results[0].solution == 2) {
        // everything is fine with the database
        console.log("Database connected and works");
    } else {
        // connection is not fine - please check
        console.error("There is something wrong with your database connection! Please check");
        process.exit(5); // <- exit application with error code e.g. 5
    }
});

// Constants for the server connection
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

// App
const app = express();

// Features for JSON Body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Feature to parse cookies (JWT)
app.use(cookieParser());

// Create a JWT secret key
const secretKey = 'my-secret-key';   // noch sicher afubewahren??

// CORS-handling custom settings
const corsOptions = {
    origin: '80',
    credentials: true,
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    exposedHeaders: 'Authorization'
};
app.use(cors(corsOptions));

app.get('/api/v1/getStockName/:stockSymbol', (req, res) => {
    connection.query("SELECT AKTIE_NAME FROM `AKTIE` WHERE AKTIE_TICKERSYMBOL = '" + req.params.stockSymbol + "'", function (error, results, fields) {
        if (error) {
            console.error(error);
            res.status(500).json(error);
        } else {
            console.log('Success answer from DB: ', results);
            res.status(200).json(results);
        }
    });
});

app.get('/api/v1/getAccountBudget', authenticate, (req, res) => {
    connection.query("SELECT * FROM `ACCOUNT` WHERE ACCOUNT_ID = " + [req.user.id], function (error, results, fields) {
        if (error) {
            console.error(error);
            res.status(500).json(error);
        } else {
            console.log('Success answer from DB: ', results);
            res.status(200).json(results);
        }
    });
});

app.get('/api/v1/getOwnStockNumber/:symbol', authenticate, (req, res) => {
    var stockNumberOwn = 0;
    var resOwnStocksNumber = {};
    connection.query("SELECT AKTIENDEPOT_ID FROM `AKTIENDEPOT` WHERE ACCOUNT_ID = " + [req.user.id], function (error, res_depot_id, fields) {
        if (error) {
            console.error(error);
            res.status(500).json(error);
        } else {
            connection.query("SELECT * FROM `AKTIENDEPOT_TRANSAKTIONEN` WHERE AKTIENDEPOT_ID = " + res_depot_id[0].AKTIENDEPOT_ID + " AND AKTIE_SYMBOL = '" + req.params.symbol + "'", function (error, results_stocks, fields) {
                if (error) {
                    console.error(error);
                    res.status(500).json(error);
                } else {
                    results_stocks.forEach(element => {
                        if (element['GEKAUFT_AM'] !== null) {
                            stockNumberOwn = stockNumberOwn + element['AKTIE_ANZAHL'];
                        } else if (element['VERKAUFT_AM'] !== null) {
                            stockNumberOwn = stockNumberOwn - element['AKTIE_ANZAHL'];
                        }
                    });
                    resOwnStocksNumber[0] = { 'numberOfStocks': stockNumberOwn }
                    console.log(stockNumberOwn)
                    res.status(200).json(resOwnStocksNumber);
                }
            });
        }
    })
});

app.get('/api/v1/getOwnStocks', authenticate, (req, res) => {
    var counter1 = 0;
    var counter2 = 0;
    var counter3 = 0;
    var newSumStocks = 0;
    var exists = false;
    var stockSymbols = [];
    let resOwnStocks = {};

    connection.query("SELECT AKTIENDEPOT_ID FROM `AKTIENDEPOT` WHERE ACCOUNT_ID = " + [req.user.id], function (error, results, fields) {
        if (error) {
            console.error(error);
            res.status(500).json(error);
        } else {
            connection.query("SELECT * FROM `AKTIENDEPOT_TRANSAKTIONEN` WHERE AKTIENDEPOT_ID = " + results[0]['AKTIENDEPOT_ID'], function (error, results_transaktionen, fields) {
                if (error) {
                    console.error(error);
                    res.status(500).json(error);
                } else {
                    results_transaktionen.forEach(row => {
                        counter2 = 0;
                        counter3 = 0;
                        stockSymbols.forEach(symbols => {
                            if (symbols == row['AKTIE_SYMBOL']) {
                                counter3 = counter2;
                                exists = true;
                                if (row['GEKAUFT_AM'] != null) {
                                    newSumStocks = row['AKTIE_ANZAHL'] + resOwnStocks[counter2]['AKTIE_ANZAHL'];
                                } else {
                                    newSumStocks = resOwnStocks[counter2]['AKTIE_ANZAHL'] - row['AKTIE_ANZAHL'];
                                }
                            }
                            counter2++;
                        });
                        if (exists == true) {
                            resOwnStocks[counter3] = { 'AKTIE_SYMBOL': row['AKTIE_SYMBOL'], 'AKTIE_ANZAHL': newSumStocks };
                            exists = false;
                        } else {
                            resOwnStocks[counter1] = { 'AKTIE_SYMBOL': row['AKTIE_SYMBOL'], 'AKTIE_ANZAHL': row['AKTIE_ANZAHL'] };
                            stockSymbols.push(row['AKTIE_SYMBOL']);
                            counter1++;
                        }
                    });
                    res.status(200).json(resOwnStocks);
                }
            });
        }
    });
});

app.get('/api/v1/getOwnTransactions', authenticate, (req, res) => {
    connection.query("SELECT AKTIENDEPOT_ID FROM `AKTIENDEPOT` WHERE ACCOUNT_ID = " + [req.user.id], function (error, results, fields) {
        if (error) {
            console.error(error);
            res.status(500).json(error);
        } else {
            connection.query("SELECT * FROM `AKTIENDEPOT_TRANSAKTIONEN` WHERE AKTIENDEPOT_ID = " + results[0]['AKTIENDEPOT_ID'], function (error, results_transaktionen, fields) {
                if (error) {
                    console.error(error);
                    res.status(500).json(error);
                } else {
                    res.status(200).json(results_transaktionen);
                }
            });
        }
    });
});

app.get('/api/v1/getStockNameSymbol/:symbol', (req, res) => {
    connection.query("SELECT * FROM `AKTIE` WHERE AKTIE_TICKERSYMBOL = '" + req.params.symbol + "'", function (error, results, fields) {
        if (error) {
            console.error(error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
            // res.status(200).json({ AKTIE_NAME: results[0]['AKTIE_NAME'], AKTIE_TICKERSYMBOL: results[0]['AKTIE_TICKERSYMBOL'], AKTIE_BOERSE: results[0]['AKTIE_BOERSE'] });
        }
    });
});

app.post('/api/v1/buyStocks', authenticate, (req, res) => {

    var sum = 0;
    var price = 0;
    var kontostand = 0;
    var stockNumber = req.body.number;
    var stockSymbol = req.body.stockSymbol;

    if (stockNumber <= 0) {
        res.status(400).json({ message: "Wrong Number of Stocks" });
    } else if (stockSymbol == "undefined") {
        res.status(400).json({ message: "No Symbol" });
    } else {
        const queryApi = new InfluxDB({ url: 'http://influxdb:8086/', token: 'bKewrAE7m1nq9-xtGdYzEtiXKxzYqax5Mc_xVMxCpiksndITqT1u68DSGg1Kx66yhWa8BWo7eigTufqIle5k1A==' }).getQueryApi('InfluxDbBroker');
        const fluxQuery = 'from(bucket: "stockcharts") |> range(start: 0) |> filter(fn: (r) => r["_measurement"] == "' + stockSymbol + '") |> filter(fn: (r) => r["Kennzahl"] == "Price") |> filter(fn: (r) => r["_field"] == "value") |> last()'

        queryApi.queryRows(fluxQuery, {
            next: (row, tableMeta) => {
                const o = tableMeta.toObject(row);
                if (`${o['Kennzahl']}` == 'Price') {
                    price = parseFloat(`${o['_value']}`);
                }
            },
            error: (error) => {
                console.error(error)
                console.log('\nQueryRows ERROR')
            },
            complete: () => {
                console.log('InfluxDB successful: Price = ' + price);
                sum = stockNumber * price;
                connection.query("SELECT KONTOSTAND FROM `ACCOUNT` WHERE ACCOUNT_ID = " + [req.user.id], function (error, res_kontostand, fields) {
                    if (error) {
                        console.error(error);
                        res.status(500).json(error);
                    } else {
                        console.log(res_kontostand[0].KONTOSTAND)

                        if (sum > res_kontostand[0].KONTOSTAND) {
                            res.status(400).json({ message: 'Sie haben nicht genügend Geld' });
                        } else {
                            kontostand = res_kontostand[0].KONTOSTAND - sum
                            console.log("Previous balance = " + res_kontostand[0].KONTOSTAND + " Purchase sum = " + sum + " new balance = " + kontostand + " price: " + price + " stockNumber" + stockNumber)
                            connection.query("SELECT AKTIENDEPOT_ID FROM `AKTIENDEPOT` WHERE ACCOUNT_ID = " + [req.user.id], function (error, res_depot_id, fields) {
                                if (error) {
                                    console.error(error);
                                    res.status(500).json(error);
                                }
                                // console.log('SELECT DER AKTIENDEPOT_ID ERFOLGREICH: ' + res_depot_id[0].AKTIENDEPOT_ID)
                                connection.query("INSERT INTO `AKTIENDEPOT_TRANSAKTIONEN` (`AKTIENDEPOT_ID`, `AKTIE_SYMBOL`, `AKTIE_ANZAHL`, `GEKAUFT_AM`) VALUES (" + res_depot_id[0].AKTIENDEPOT_ID + ",'" + stockSymbol + "'," + stockNumber + ", current_timestamp())", function (error, res_buchung, fields) {
                                    if (error) {
                                        console.error(error);
                                        res.status(500).json(error);
                                    }
                                    else {
                                        // res.status(200).json({ message: 'Buchung durchgeführt' });
                                        connection.query("UPDATE `ACCOUNT` SET KONTOSTAND = " + kontostand + " WHERE ACCOUNT_ID = " + [req.user.id], function (error, res_update_kontostand, fields) {
                                            if (error) {
                                                console.error(error);
                                                res.status(500).json(error);
                                            }
                                            else {
                                                res.status(200).json({ message: 'Buchung durchgeführt', kontostand: kontostand });
                                            }
                                        })
                                    }
                                })
                            })
                        }
                    }
                })
            },
        })
    }
});

app.post('/api/v1/sellStock', authenticate, (req, res) => {

    var sum = 0;
    var price = 0;
    var kontostand = 0;
    var stockNumberOwn = 0;
    var stockNumber = req.body.number;
    var stockSymbol = req.body.stockSymbol;

    if (stockNumber <= 0) {
        res.status(400).json({ message: "No Number of Stocks" });
    } else if (stockSymbol == "undefined") {
        res.status(400).json({ message: "No Symbol" });
    } else {

        connection.query("SELECT AKTIENDEPOT_ID FROM `AKTIENDEPOT` WHERE ACCOUNT_ID = " + [req.user.id], function (error, res_depot_id, fields) {
            if (error) {
                console.error(error);
                res.status(500).json(error);
            } else {

                //Determination of number of stocks
                connection.query("SELECT * FROM `AKTIENDEPOT_TRANSAKTIONEN` WHERE AKTIENDEPOT_ID = " + res_depot_id[0].AKTIENDEPOT_ID + " AND AKTIE_SYMBOL = '" + stockSymbol + "'", function (error, results, fields) {
                    if (error) {
                        console.error(error);
                        res.status(500).json(error);
                    } else {
                        results.forEach(element => {
                            console.log('Symbol: ' + element['AKTIE_SYMBOL'] + ' number: ' + element['AKTIE_ANZAHL'] + ' Purchased On: ' + element['GEKAUFT_AM'] + ' Sold on: ' + element['VERKAUFT_AM']);
                            if (element['GEKAUFT_AM'] !== null) {
                                stockNumberOwn = stockNumberOwn + element['AKTIE_ANZAHL'];
                            } else if (element['VERKAUFT_AM'] !== null) {
                                stockNumberOwn = stockNumberOwn - element['AKTIE_ANZAHL'];
                            }
                            console.log('Number of stocks: ' + stockNumberOwn)
                        });

                        if ((stockNumberOwn - stockNumber) < 0) {
                            res.status(400).json({ message: 'Anzahl Besitz: ' + stockNumberOwn + ", Wenn verkaufen: " + (stockNumberOwn - stockNumber) });
                        } else {
                            const queryApi = new InfluxDB({ url: 'http://influxdb:8086/', token: 'bKewrAE7m1nq9-xtGdYzEtiXKxzYqax5Mc_xVMxCpiksndITqT1u68DSGg1Kx66yhWa8BWo7eigTufqIle5k1A==' }).getQueryApi('InfluxDbBroker');
                            const fluxQuery = 'from(bucket: "stockcharts") |> range(start: 0) |> filter(fn: (r) => r["_measurement"] == "' + stockSymbol + '") |> filter(fn: (r) => r["Kennzahl"] == "Price") |> filter(fn: (r) => r["_field"] == "value") |> last()'

                            queryApi.queryRows(fluxQuery, {
                                next: (row, tableMeta) => {
                                    const o = tableMeta.toObject(row);
                                    if (`${o['Kennzahl']}` == 'Price') {
                                        price = parseFloat(`${o['_value']}`);
                                    }
                                },
                                error: (error) => {
                                    console.error(error)
                                    console.log('InfluxDB ERROR')
                                },
                                complete: () => {
                                    console.log('InfluxDB sucessful: Price = ' + price);
                                    sum = stockNumber * price;

                                    connection.query("SELECT KONTOSTAND FROM `ACCOUNT` WHERE ACCOUNT_ID = " + [req.user.id], function (error, res_kontostand, fields) {
                                        if (error) {
                                            console.error(error);
                                            res.status(500).json(error);
                                        } else {
                                            console.log(res_kontostand[0].KONTOSTAND)
                                            kontostand = res_kontostand[0].KONTOSTAND + sum
                                            console.log("Previous balance = " + res_kontostand[0].KONTOSTAND + " Purchase amount = " + sum + " new balance = " + kontostand + " Price: " + price + " stockNumber" + stockNumber)


                                            connection.query("INSERT INTO `AKTIENDEPOT_TRANSAKTIONEN` (`AKTIENDEPOT_ID`, `AKTIE_SYMBOL`, `AKTIE_ANZAHL`, `VERKAUFT_AM`) VALUES (" + res_depot_id[0].AKTIENDEPOT_ID + ",'" + stockSymbol + "'," + stockNumber + ", current_timestamp())", function (error, res_buchung, fields) {
                                                if (error) {
                                                    console.error(error);
                                                    res.status(500).json(error);
                                                }
                                                else {
                                                    // res.status(200).json({ message: 'Buchung durchgeführt' });
                                                    connection.query("UPDATE `ACCOUNT` SET KONTOSTAND = " + kontostand + " WHERE ACCOUNT_ID = " + [req.user.id], function (error, res_update_kontostand, fields) {
                                                        if (error) {
                                                            console.error(error);
                                                            res.status(500).json(error);
                                                        }
                                                        else {
                                                            res.status(200).json({ message: 'Buchung durchgeführt', kontostand: kontostand });
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                },
                            })
                        }
                    }
                });
            }
        })
    }
});


// ********************************************* START Multiplayer APIs **********************************************************************

app.get('/api/v1/multiplayer/status', authenticate, (req, res) => {
    connection.query("SELECT MLTP_SPIEL_ID FROM `ACCOUNT` WHERE ACCOUNT_ID = " + [req.user.id], function (error, results, fields) {
        if (error) {
            console.error(error);
            res.status(500).json(error);
        } else {
            if (results[0].MLTP_SPIEL_ID != null) {
                res.status(200).json({ results: true });
            } else {
                res.status(200).json({ results: false });
            }
            console.log(results[0].MLTP_SPIEL_ID);
        }
    });
});

app.post('/api/v1/multiplayer/erstellen', authenticate, (req, res) => {
    if (typeof req.body !== "undefined") {
        var startDate = req.body.startDate;
        var endDate = req.body.endDate;
        startDate = startDate.substring(0, 11);
        endDate = endDate.substring(0, 11);

        connection.query("INSERT INTO `MULTIPLAYER_SPIEL` (`MLTP_PASSWORT`, `BUDGET`, `ANFANGSZEITPUNKT`, `ENDZEITPUNKT`) VALUES ('" + req.body.password + "', '" + req.body.budget + "', '" + startDate + "', '" + endDate + "')", function (error, results, fields) {
            if (error) {
                // we got an errror - inform the client
                console.error(error); // <- log error in server
                res.status(500).json(error); // <- send to client
            } else {
                // Everything is fine with the query
                console.log('Success answer: ', results); // <- log results in console
                // INFO: Here can be some checks of modification of the result
                res.status(200).json(results); // <- send it to client
            }
        });
    } else {
        // There is no body and post_contend
        console.error("Client send no 'post_content'")
        // Set HTTP Status -> 400 is client error -> and send message
        res.status(400).json({ message: 'This function requries a body with "post_content"' });
    }
});

app.post('/api/v1/multiplayer/beitreten', authenticate, (req, res) => {
    if (typeof req.body !== "undefined") {
        connection.query("SELECT `MLTP_PASSWORT` FROM `MULTIPLAYER_SPIEL` WHERE `MLTP_SPIEL_ID` = " + req.body.id, function (error, results, fields) {
            if (error) {
                console.error(error); // <- log error in server
                res.status(500).json(error); // <- send to client
            } else {
                if (results[0] != undefined) {
                    if (results[0].MLTP_PASSWORT == req.body.password) {
                        connection.query("SELECT `BUDGET` FROM `MULTIPLAYER_SPIEL` WHERE `MLTP_SPIEL_ID` = " + req.body.id, function (error, results_mltp_budget, fields) {
                            if (error) {
                                // we got an errror - inform the client
                                console.error(error); // <- log error in server
                                res.status(500).json(error); // <- send to client
                            } else {
                                connection.query("UPDATE `ACCOUNT` SET `MLTP_SPIEL_ID` = " + req.body.id + ", `MLTP_KONTOSTAND` = " + results_mltp_budget[0].BUDGET + " WHERE `ACCOUNT_ID` = " + [req.user.id], function (error, results_update_acc, fields) {
                                    if (error) {
                                        // we got an errror - inform the client
                                        console.error(error); // <- log error in server
                                        res.status(500).json(error); // <- send to client
                                    } else {
                                        res.status(200).json(results_update_acc); // <- send to client
                                    }
                                });
                            }
                        });
                    } else {
                        res.status(401).json({ message: 'Unauthorized: password wrong' }); // <- send it to client
                    }
                } else {
                    res.status(401).json({ message: 'Unauthorized: ID wrong' }); // <- send it to client
                }
            }
        });
    }
    else {
        // There is no body and post_contend
        console.error("Client send no 'post_content'")
        // Set HTTP Status -> 400 is client error -> and send message
        res.status(400).json({ message: 'This function requries a body with "post_content"' });
    }
});

app.get('/api/v1/getMltpOwnStocks', authenticate, (req, res) => {

    var counter1 = 0;
    var counter2 = 0;
    var counter3 = 0;
    var newSumStocks = 0;
    var exists = false;
    var stockSymbols = [];
    let resOwnStocks = {};

    connection.query("SELECT MLTP_DEPOT_ID FROM `MULTIPLAYER_DEPOT` WHERE ACCOUNT_ID = " + [req.user.id], function (error, results, fields) {
        if (error) {
            console.error(error);
            res.status(500).json(error);
        } else {
            if(results[0] != undefined) {
                console.log(results[0]['MLTP_DEPOT_ID']);
                connection.query("SELECT * FROM `MULTIPLAYER_DEPOT_TRANSAKTIONEN` WHERE MLTP_DEPOT_ID = " + results[0]['MLTP_DEPOT_ID'], function (error, results_transaktionen, fields) {
                    if (error) {
                        console.error(error);
                        res.status(500).json(error);
                    } else {
                        results_transaktionen.forEach(row => {
                            counter2 = 0;
                            counter3 = 0;
                            stockSymbols.forEach(symbols => {
                                if (symbols == row['AKTIE_SYMBOL']) {
                                    counter3 = counter2;
                                    exists = true;
                                    if (row['GEKAUFT_AM'] != null) {
                                        newSumStocks = row['AKTIE_ANZAHL'] + resOwnStocks[counter2]['AKTIE_ANZAHL'];
                                    } else {
                                        newSumStocks = resOwnStocks[counter2]['AKTIE_ANZAHL'] - row['AKTIE_ANZAHL'];
                                    }
                                }
                                counter2++;
                            });
                            if (exists == true) {
                                resOwnStocks[counter3] = { 'AKTIE_SYMBOL': row['AKTIE_SYMBOL'], 'AKTIE_ANZAHL': newSumStocks };
                                exists = false;
                            } else {
                                resOwnStocks[counter1] = { 'AKTIE_SYMBOL': row['AKTIE_SYMBOL'], 'AKTIE_ANZAHL': row['AKTIE_ANZAHL'] };
                                stockSymbols.push(row['AKTIE_SYMBOL']);
                                counter1++;
                            }
                        });
                        res.status(200).json(resOwnStocks);
                    }
                });
            } else {
                res.status(200).json({ message: 'No data found'});
            }
        }
    });
});

app.get('/api/v1/getMltpOwnStockNumber/:symbol', authenticate, (req, res) => {
    var stockNumberOwn = 0;
    var resOwnStocksNumber = {};
    connection.query("SELECT MLTP_DEPOT_ID FROM `MULTIPLAYER_DEPOT` WHERE ACCOUNT_ID = " + [req.user.id], function (error, res_depot_id, fields) {
        if (error) {
            console.error(error);
            res.status(500).json(error);
        } else {
            if(res_depot_id[0] != undefined) {
                connection.query("SELECT * FROM `MULTIPLAYER_DEPOT_TRANSAKTIONEN` WHERE MLTP_DEPOT_ID = " + res_depot_id[0].MLTP_DEPOT_ID + " AND AKTIE_SYMBOL = '" + req.params.symbol + "'", function (error, results_stocks, fields) {
                    if (error) {
                        console.error(error);
                        res.status(500).json(error);
                    } else {
                        results_stocks.forEach(element => {
                            if (element['GEKAUFT_AM'] !== null) {
                                stockNumberOwn = stockNumberOwn + element['AKTIE_ANZAHL'];
                            } else if (element['VERKAUFT_AM'] !== null) {
                                stockNumberOwn = stockNumberOwn - element['AKTIE_ANZAHL'];
                            }
                        });
                        resOwnStocksNumber[0] = { 'numberOfStocks': stockNumberOwn }
                        console.log(stockNumberOwn)
                        res.status(200).json(resOwnStocksNumber);
                    }
                });
            } else {
                res.status(200).json( { message: 'No data found'});
            }
        }
    })
});

app.get('/api/v1/getMltpOwnTransactions', authenticate, (req, res) => {
    connection.query("SELECT MLTP_DEPOT_ID FROM `MULTIPLAYER_DEPOT` WHERE ACCOUNT_ID = " + [req.user.id], function (error, results, fields) {
        if (error) {
            console.error(error);
            res.status(500).json(error);
        } else {
            if(results[0] != undefined) {
                connection.query("SELECT * FROM `MULTIPLAYER_DEPOT_TRANSAKTIONEN` WHERE MLTP_DEPOT_ID = " + results[0]['MLTP_DEPOT_ID'], function (error, results_transaktionen, fields) {
                    if (error) {
                        console.error(error);
                        res.status(500).json(error);
                    } else {
                        res.status(200).json(results_transaktionen);
                    }
                });
            }
        }
    });
});

app.post('/api/v1/buyStocksMltp', authenticate, (req, res) => {

    var sum = 0;
    var price = 0;
    var kontostand = 0;
    var stockNumber = req.body.number;
    var stockSymbol = req.body.stockSymbol;

    if (stockNumber <= 0) {
        res.status(400).json({ message: "Wrong Number of Stocks" });
    } else if (stockSymbol == "undefined") {
        res.status(400).json({ message: "No Symbol" });
    } else {
        const queryApi = new InfluxDB({ url: 'http://influxdb:8086/', token: 'bKewrAE7m1nq9-xtGdYzEtiXKxzYqax5Mc_xVMxCpiksndITqT1u68DSGg1Kx66yhWa8BWo7eigTufqIle5k1A==' }).getQueryApi('InfluxDbBroker');
        const fluxQuery = 'from(bucket: "stockcharts") |> range(start: 0) |> filter(fn: (r) => r["_measurement"] == "' + stockSymbol + '") |> filter(fn: (r) => r["Kennzahl"] == "Price") |> filter(fn: (r) => r["_field"] == "value") |> last()'

        queryApi.queryRows(fluxQuery, {
            next: (row, tableMeta) => {
                const o = tableMeta.toObject(row);
                if (`${o['Kennzahl']}` == 'Price') {
                    price = parseFloat(`${o['_value']}`);
                }
            },
            error: (error) => {
                console.error(error)
                console.log('\nQueryRows ERROR')
            },
            complete: () => {
                console.log('InfluxDB successful: Price = ' + price);
                sum = stockNumber * price;
                connection.query("SELECT MLTP_KONTOSTAND FROM `ACCOUNT` WHERE ACCOUNT_ID = " + [req.user.id], function (error, res_kontostand, fields) {
                    if (error) {
                        console.error(error);
                        res.status(500).json(error);
                    } else {
                        console.log(res_kontostand[0].MLTP_KONTOSTAND)

                        if (sum > res_kontostand[0].MLTP_KONTOSTAND) {
                            res.status(400).json({ message: 'Sie haben nicht genügend Geld' });
                        } else {
                            kontostand = res_kontostand[0].MLTP_KONTOSTAND - sum
                            console.log("Previous balance = " + res_kontostand[0].MLTP_KONTOSTAND + " Purchase amount = " + sum + " New balance = " + kontostand + " Price: " + price + " stockNumber" + stockNumber)
                            connection.query("SELECT MLTP_DEPOT_ID FROM `MULTIPLAYER_DEPOT` WHERE ACCOUNT_ID = " + [req.user.id], function (error, res_depot_id, fields) {
                                if (error) {
                                    console.error(error);
                                    res.status(500).json(error);
                                }
                                console.log('SELECT DER MTLP_DEPOT_ID ERFOLGREICH: ' + res_depot_id[0].MLTP_DEPOT_ID)
                                connection.query("INSERT INTO `MULTIPLAYER_DEPOT_TRANSAKTIONEN` (`MLTP_DEPOT_ID`, `AKTIE_SYMBOL`, `AKTIE_ANZAHL`, `GEKAUFT_AM`) VALUES (" + res_depot_id[0].MLTP_DEPOT_ID + ",'" + stockSymbol + "'," + stockNumber + ", current_timestamp())", function (error, res_buchung, fields) {
                                    if (error) {
                                        console.error(error);
                                        res.status(500).json(error);
                                    }
                                    else {
                                        console.log('INSERT SUCCEFUL: ' + res_depot_id[0].MLTP_DEPOT_ID)
                                        connection.query("UPDATE `ACCOUNT` SET MLTP_KONTOSTAND = " + kontostand + " WHERE ACCOUNT_ID = " + [req.user.id], function (error, res_update_kontostand, fields) {
                                            if (error) {
                                                console.error(error);
                                                res.status(500).json(error);
                                            }
                                            else {
                                                res.status(200).json({ message: 'Buchung durchgeführt', kontostand: kontostand });
                                            }
                                        })
                                    }
                                })
                            })
                        }
                    }
                })
            },
        })
    }
});

app.post('/api/v1/sellStockMltp', authenticate, (req, res) => {

    var sum = 0;
    var price = 0;
    var kontostand = 0;
    var stockNumberOwn = 0;
    var stockNumber = req.body.number;
    var stockSymbol = req.body.stockSymbol;

    if (stockNumber <= 0) {
        res.status(400).json({ message: "No Number of Stocks" });
    } else if (stockSymbol == "undefined") {
        res.status(400).json({ message: "No Symbol" });
    } else {

        connection.query("SELECT MLTP_DEPOT_ID FROM `MULTIPLAYER_DEPOT` WHERE ACCOUNT_ID = " + [req.user.id], function (error, res_depot_id, fields) {
            if (error) {
                console.error(error);
                res.status(500).json(error);
            } else {

                //Ermittlung Anzahl der Aktien
                connection.query("SELECT * FROM `MULTIPLAYER_DEPOT_TRANSAKTIONEN` WHERE MLTP_DEPOT_ID = " + res_depot_id[0].MLTP_DEPOT_ID + " AND AKTIE_SYMBOL = '" + stockSymbol + "'", function (error, results, fields) {
                    if (error) {
                        console.error(error);
                        res.status(500).json(error);
                    } else {
                        results.forEach(element => {
                            console.log('Symbol: ' + element['AKTIE_SYMBOL'] + ' Amount: ' + element['AKTIE_ANZAHL'] + ' Purchased on: ' + element['GEKAUFT_AM'] + ' Sold on: ' + element['VERKAUFT_AM']);
                            if (element['GEKAUFT_AM'] !== null) {
                                stockNumberOwn = stockNumberOwn + element['AKTIE_ANZAHL'];
                            } else if (element['VERKAUFT_AM'] !== null) {
                                stockNumberOwn = stockNumberOwn - element['AKTIE_ANZAHL'];
                            }
                            console.log('Number of stocks: ' + stockNumberOwn)
                        });

                        if ((stockNumberOwn - stockNumber) < 0) {
                            res.status(400).json({ message: 'Anzahl Besitz: ' + stockNumberOwn + ", Wenn verkaufen: " + (stockNumberOwn - stockNumber) });
                        } else {
                            const queryApi = new InfluxDB({ url: 'http://influxdb:8086/', token: 'bKewrAE7m1nq9-xtGdYzEtiXKxzYqax5Mc_xVMxCpiksndITqT1u68DSGg1Kx66yhWa8BWo7eigTufqIle5k1A==' }).getQueryApi('InfluxDbBroker');
                            const fluxQuery = 'from(bucket: "stockcharts") |> range(start: 0) |> filter(fn: (r) => r["_measurement"] == "' + stockSymbol + '") |> filter(fn: (r) => r["Kennzahl"] == "Price") |> filter(fn: (r) => r["_field"] == "value") |> last()'

                            queryApi.queryRows(fluxQuery, {
                                next: (row, tableMeta) => {
                                    const o = tableMeta.toObject(row);
                                    if (`${o['Kennzahl']}` == 'Price') {
                                        price = parseFloat(`${o['_value']}`);
                                    }
                                },
                                error: (error) => {
                                    console.error(error)
                                    console.log('InfluxDB ERROR')
                                },
                                complete: () => {
                                    console.log('InfluxDB succeful: Price = ' + price);
                                    sum = stockNumber * price;

                                    connection.query("SELECT MLTP_KONTOSTAND FROM `ACCOUNT` WHERE ACCOUNT_ID = " + [req.user.id], function (error, res_kontostand, fields) {
                                        if (error) {
                                            console.error(error);
                                            res.status(500).json(error);
                                        } else {
                                            console.log(res_kontostand[0].MLTP_KONTOSTAND)
                                            kontostand = res_kontostand[0].MLTP_KONTOSTAND + sum
                                            console.log("Previous balance = " + res_kontostand[0].MLTP_KONTOSTAND + " Purchase amount = " + sum + " New balance = " + kontostand + " Price: " + price + " stockNumber" + stockNumber)


                                            connection.query("INSERT INTO `MULTIPLAYER_DEPOT_TRANSAKTIONEN` (`MLTP_DEPOT_ID`, `AKTIE_SYMBOL`, `AKTIE_ANZAHL`, `VERKAUFT_AM`) VALUES (" + res_depot_id[0].MLTP_DEPOT_ID + ",'" + stockSymbol + "'," + stockNumber + ", current_timestamp())", function (error, res_buchung, fields) {
                                                if (error) {
                                                    console.error(error);
                                                    res.status(500).json(error);
                                                }
                                                else {
                                                    // res.status(200).json({ message: 'Buchung durchgeführt' });
                                                    connection.query("UPDATE `ACCOUNT` SET MLTP_KONTOSTAND = " + kontostand + " WHERE ACCOUNT_ID = " + [req.user.id], function (error, res_update_kontostand, fields) {
                                                        if (error) {
                                                            console.error(error);
                                                            res.status(500).json(error);
                                                        }
                                                        else {
                                                            res.status(200).json({ message: 'Buchung durchgeführt', kontostand: kontostand });
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                },
                            })
                        }
                    }
                });
            }
        })
    }
});

// ********************************************* END Multiplayer APIs **********************************************************************

// API for Login
app.post('/api/v1/login', (req, res) => {

    console.log("Client sent following mail adress: " + req.body.email);
    console.log("Escaped req.body.email: " + connection.escape(req.body.email))
    const email = connection.escape(req.body.email)  // escape will escape following signs: " ' \ % _ to protect against SQL-Injections

    var pw_correct = false;

    connection.query("SELECT ACCOUNT_ID, EMAIL, PASSWORT FROM `ACCOUNT` WHERE EMAIL = " + email + ";", function (error, res_email, fields) {

        if (error) {
            console.error(error);
            res.status(500).json(error);
        }

        else {
            if (res_email.length == 0) {
                console.log("res_email.length = " + res_email.length)
                console.log("No account found for sent email.")
                res.status(400).json({ message: "Es konnte kein Account mit dieser Email Adresse gefunden werden!" });
            }

            else {
                if (res_email.length > 0) {
                    console.log("res_email.length = " + res_email.length)
                    console.log("The entered mail was found in the database.")
                    console.log("Email in MariaDB = " + res_email[0].EMAIL)

                    bcrypt.compare(req.body.passwort, res_email[0].PASSWORT, function (err, compare_result) { //bcrypt compare of the password sent from the client

                        console.log("compare_result of password check = " + compare_result)
                        pw_correct = compare_result;

                        if (pw_correct == true) {

                            const user = res_email[0];
                            // Generate a JWT with the user's ID and email  // MÜSSEN WIR NOCH EINEN REFRESH FÜR DEN JWT TOKEN IMPLEMENTIEREN??
                            const token = jwt.sign(
                                { id: user.ACCOUNT_ID, email: user.EMAIL },
                                secretKey,
                                { expiresIn: '3h' }  // bewusst 3h, da Aktien Broker gerne die Seite offen lassen und hin un wieder checken
                            );

                            // Set the JWT as a cookie in the response
                            res.cookie('jwt', token, { httpOnly: true, secure: true, sameSite: "strict" });  // always use httpOnly to send JWT cookie to protect againt Cross-Site-Scripting!

                            res.status(200).json({ token: token, message: "Login erfolgreich!" }); //res.status(200).json({ token: token });  EVTL NUR ÜBER COOKIE UND NICHT ALS RESPONSE DEN TOKEN SENDEN???
                        }
                        if (pw_correct == false) {
                            res.status(400).json({ message: "Falsches Passwort oder falsche Email!" });
                        }

                    })
                }
            }
        }
    });
});

// API for password-check
app.post('/api/v1/protected/passwort-check', authenticate, (req, res) => {

    console.log("Client sent password-check request");

    var pw_correct = false;

    connection.query("SELECT PASSWORT FROM `ACCOUNT` WHERE ACCOUNT_ID = ?;", [req.user.id], function (error, res_email, fields) {

        if (error) {
            console.error(error);
            res.status(500).json(error);
        }

        else {

            console.log("password is beeing checked")

            bcrypt.compare(req.body.passwort, res_email[0].PASSWORT, function (err, compare_result) { //bcrypt compare of the password sent from the client
                console.log("compare_result = " + compare_result)
                pw_correct = compare_result;

                if (pw_correct == true) {
                    res.status(200).json({ message: 'Passwort korrekt!' }); //res.status(200).json({ token: token });  EVTL NUR ÜBER COOKIE UND NICHT ALS RESPONSE DEN TOKEN SENDEN???
                }
                if (pw_correct == false) {
                    res.status(400).json({ message: 'Falsches Passwort!' });
                }
            })
        }
    })
})

// Middleware to check if a user is authenticated (JWT)
function authenticate(req, res, next) {
    const cookie = req.cookies['jwt'];
    console.log(cookie)

    if (!cookie) {
        return res.status(401).json({ message: 'No token found' });
    }

    // Verify the JWT AND ----> attach the user's ID and email to the request object <----
    jwt.verify(cookie, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = decoded;
        next();
    });
}

// API for Logout (logout a user by clearing the JWT cookie)
app.get('/api/v1/logout', function (req, res) {
    res.clearCookie('jwt', { maxAge: 0 });
    res.json({ message: 'Logout successful' });
});

// API for mein-account (get account [personal and gamer]-data)
app.get('/api/v1/protected/mein-account', authenticate, (req, res) => {
    connection.query("SELECT * FROM `ACCOUNT` WHERE ACCOUNT_ID = ?;", [req.user.id], function (error, results, fields) {
        if (error) {
            console.error(error);
            res.status(500).json(error);
        } else {
            console.log('Success answer from DB: ', results);
            res.status(200).json(results);
        }
    });
});

// API for Account deletion
app.delete('/api/v1/protected/account-loeschen', authenticate, (req, res) => {

    console.log("Request to delete Account of ACCOUNT_ID: " + req.user.id);
    // Delete ACCOUNT entry ---> MULTIPLAYER_ACCOUNT entry and AKTIENDEPOT entry and AKTIENDEPOT_ZUWEISUNG entries will be deleted because of table relations, see our MariaDB
    connection.query("DELETE FROM ACCOUNT WHERE ACCOUNT_ID = ?;", [req.user.id], function (error, results, fields) {
        if (error) {
            console.error(error);
            res.status(500).json(error);

        } else {
            console.log('Success answer: ', results);
            res.clearCookie('jwt');
            res.status(200).json("Account erfolgreich gelöscht!");

        }
    });
});

// API for registration
app.post('/api/v1/registrierung/account-anlegen', (req, res) => {

    const spielername = connection.escape(req.body.spielername)
    const email = connection.escape(req.body.email)
    console.log("Escaped req.body.email and spielername: " + connection.escape(req.body.email) + "  " + connection.escape(req.body.spielername))

    connection.query("SELECT SPIELERNAME, EMAIL FROM `ACCOUNT` WHERE SPIELERNAME = " + spielername + " OR EMAIL = " + email + ";", function (error, res_duplikatPruef, fields) {
        if (error) {
            console.error(error);
            res.status(500).json(error);
        } else {
            
            if (res_duplikatPruef.length == 0) {
                // no duplicates of Email and Spielername in MariaDB found
                console.log("MariaDB found no duplicates --> Email and Spielername are available to use!")

                var anrede = req.body.anrede;
                anrede = anrede.replace(/^\w/, c => c.toUpperCase());
                var vorname = connection.escape(req.body.vorname);
                var nachname = connection.escape(req.body.nachname);
                var nachname_noescape = req.body.nachname;
                var strasse = connection.escape(req.body.strasse);
                var hausnummer = connection.escape(req.body.hausnummer);
                var plz = connection.escape(req.body.plz);
                var stadt = connection.escape(req.body.stadt);
                var spielername = connection.escape(req.body.spielername);
                var email = connection.escape(req.body.email);
                var passwort = req.body.passwort;
                var multiplayer_id = 0;
                var multiplayer_id_int;

                console.log("Client sendet DB insert request with 'anrede': " + anrede + " ; vorname: " + vorname + " ; nachname: " + nachname + " ; spielername: " + spielername + " ; email: " + email)

                bcrypt.genSalt(saltRounds, function (err, salt) { //insert hashed password in MariaDB
                    bcrypt.hash(passwort, salt, function (err, hash) {

                        connection.query("INSERT INTO `ACCOUNT` (`ACCOUNT_ID`, `ANREDE`, `VORNAME`, `NACHNAME`, `STRASSE`, `HAUSNUMMER`, `PLZ`, `STADT`, `SPIELERNAME`, `EMAIL`, `PASSWORT`, `ERSTELLT_AM`) VALUES (NULL, '"
                            + anrede + "', " + vorname + ", " + nachname + ", " + strasse + ", " + hausnummer + ", " + plz + ", " + stadt + ", " + spielername + ", " + email + ", '" + hash +
                            "', current_timestamp());", function (error, results, fields) {

                                if (error) {
                                    console.error(error);
                                    res.status(500).json(error);
                                } else {
                                    console.log("Account entry successfully created, next to create are Multiplayer_Depot + Aktiendepot");
                                    connection.query("SELECT `ACCOUNT_ID` FROM `ACCOUNT` WHERE `SPIELERNAME` = " + spielername + ";", function (error, res_multID, fields) {
                                        multiplayer_id = res_multID[0].ACCOUNT_ID;
                                        console.log("Found Account_ID to use for Multiplayer_ID = " + multiplayer_id)

                                        connection.query("INSERT INTO `AKTIENDEPOT` (`ACCOUNT_ID`) VALUES (" + multiplayer_id + ")", function (error, res_depot, fields) {

                                            if (error) {

                                                console.error(error);
                                                res.status(500).json(error);

                                            } else {

                                                connection.query("INSERT INTO `MULTIPLAYER_DEPOT` (`ACCOUNT_ID`) VALUES (" + multiplayer_id + ")", function (error, res_depot, fields) {

                                                    if (error) {
        
                                                        console.error(error);
                                                        res.status(500).json(error);
        
                                                    } else {
                                                        console.log("Multiplayer_Depot + Aktiendepot successfully created!")
                                                        console.log('Successful answer from MariaDB: ', res_depot);
                                                        res.status(200).json("Erfolgreich registriert! Bitte loggen Sie sich nun ein " + anrede + " " + nachname_noescape + ".");
                                                    }
                                                })
                                            }
                                        })
                                    });
                                }
                            });
                    });
                });
            } else {
                
                if (res_duplikatPruef.length > 0) {
                    // Email or Spielername already taken
                    console.log("Found duplicate! Spielername in MariaDB = " + res_duplikatPruef[0].SPIELERNAME + ", Spielername from Client = " + req.body.spielername)
                    console.log("Email in MariaDB = " + res_duplikatPruef[0].EMAIL + ", Email from Client = " + req.body.email)

                    if (res_duplikatPruef[0].EMAIL == req.body.email) {
                        console.log("Email already taken!")
                        res.status(400).json({ message: "Email  '" + req.body.email + "'  schon vorhanden!" });

                    } else if (res_duplikatPruef[0].SPIELERNAME == req.body.spielername) {
                        console.log("Spielername already taken!")
                        res.status(400).json({ message: "Spielername  '" + req.body.spielername + "'  schon vorhanden!" }); 
                    }

                } else {
                    console.error("Client sent no correct data!")
                    res.status(400).json({ message: 'Client hat keine korrekten Daten gesendet!!' });
                }
            }
        }
    });
});

// API for changing (persoal) account-data
app.put('/api/v1/protected/mein-account/account-aendern', authenticate, (req, res) => {

    var current_spielername
    var current_mail

    const spielername = connection.escape(req.body.spielername)
    const email = connection.escape(req.body.email)

    // function for starting the sql update
    function edit_account() {
        console.log("Starting SQL update query")

        var anrede = req.body.anrede;
        anrede = anrede.replace(/^\w/, c => c.toUpperCase());
        var vorname = connection.escape(req.body.vorname);
        var nachname = connection.escape(req.body.nachname);
        var nachname_noescape = req.body.nachname;
        var strasse = connection.escape(req.body.strasse);
        var hausnummer = connection.escape(req.body.hausnummer);
        var plz = connection.escape(req.body.plz);
        var stadt = connection.escape(req.body.stadt);
        var spielername = connection.escape(req.body.spielername);
        var email = connection.escape(req.body.email);

        console.log("Client sent DB update request with 'anrede': " + anrede + " ; vorname: " + vorname +
            " ; nachname: " + nachname + " ; spielername: " + spielername + " ; email: " + email)

        connection.query("UPDATE `ACCOUNT` SET `ANREDE` = '" + anrede + "', `VORNAME` = " + vorname + ", `NACHNAME` = " + nachname + ", `STRASSE` = " +
            strasse + ", `HAUSNUMMER` = " + hausnummer + ", `PLZ` = " + plz + ", `STADT` = " + stadt + ", `SPIELERNAME` = " + spielername + ", `EMAIL` = " +
            email + " WHERE ACCOUNT_ID = ?;", [req.user.id], function (error, results, fields) {

                if (error) {
                    console.error(error);
                    res.status(500).json(error);
                } else {
                    console.log("Accountdaten erfolgreich geändert!")
                    console.log('Erfolgreiche Antwort der DB: ', results);
                    res.status(200).json("Accountdaten erfolgreich geändert!");
                }
            });
    };
    // api starts here
    connection.query("SELECT SPIELERNAME, EMAIL FROM `ACCOUNT` WHERE ACCOUNT_ID = ?;", [req.user.id], function (error, res_current, fields) {
        if (error) {
            console.error(error);
            res.status(500).json(error);
        }
        else {
            current_mail = res_current[0].EMAIL
            current_spielername = res_current[0].SPIELERNAME
            console.log("Current mail = " + current_mail + "current Spielername = " + current_spielername)

            if (current_mail !== req.body.email | current_spielername !== req.body.spielername) { // means duplicate check is neccessary

                connection.query("SELECT SPIELERNAME, EMAIL FROM `ACCOUNT` WHERE EMAIL = " + email + " OR SPIELERNAME = " + spielername +
                    ";", function (error, res_duplikatPruef, fields) {

                        if (error) {
                            console.error(error);
                            res.status(500).json(error);
                        }

                        else {
                            if (res_duplikatPruef.length == 0) { // No duplicates for email and Spielername found in DB
                                edit_account();
                            }

                            else {
                                if (res_duplikatPruef.length > 0) { // Found duplicate for Email or Spielername
                                    console.log("Duplicate check begins. Spielername in MariaDB = " + res_duplikatPruef[0].SPIELERNAME + ", Spielername from Client = " + req.body.spielername + "Current Spielername = " + current_spielername)
                                    console.log("Email in MariaDB = " + res_duplikatPruef[0].EMAIL + ", Email from Client = " + req.body.email + "Current email = " + current_mail)

                                    if (res_duplikatPruef[0].EMAIL == req.body.email && res_duplikatPruef[0].EMAIL !== current_mail) { // found duplicate for email, which is not the current mail adress
                                        console.log("Email already taken!")
                                        res.status(400).json({ message: "Email  '" + req.body.email + "'  schon vorhanden!" });
                                    }

                                    else {
                                        if (res_duplikatPruef[0].SPIELERNAME == req.body.spielername && res_duplikatPruef[0].SPIELERNAME !== current_spielername) { //found duplicate for Spielername, which is not the current Spielername
                                            console.log("Spielername already taken!")
                                            res.status(400).json({ message: "Spielername  '" + req.body.spielername + "'  schon vorhanden!" });
                                        }
                                        else {
                                            console.log("No duplicate found!")
                                            edit_account()
                                        }
                                    }
                                }

                                else {
                                    console.error("Client sent no correct data!")
                                    res.status(400).json({ message: 'Client hat keine korrekten Daten gesendet!!' });
                                }
                            }
                        }
                    });
            }
            else {
                console.log("Spielername and Mail Adresse haven't been changed. No check for duplicate neccessary.")
                edit_account();
            }
        }
    });
})

// API for mein-account (getting personal data)
app.get('/api/v1/protected/highscore-data', authenticate, (req, res) => {
    connection.query("SELECT SPIELERNAME, KONTOSTAND FROM `ACCOUNT`", function (error, results, fields) {
        if (error) {
            console.error(error);
            res.status(500).json(error);
        } else {
            console.log('Success answer from DB: ', results);
            res.status(200).json(results);
        }
    });
});

// Start the actual server
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

// Start database connection
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}