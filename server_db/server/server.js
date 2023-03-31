'use strict';

/*//// JWT
import { Request, Response } from "express";
import * as express from 'express';
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
import * as jwt from 'jsonwebtoken';
import * as fs from "fs";
//////////// */

//Bitte schmeiß kein Fehler

const express = require('express');

//bcrypt Passwort hashen (serverseitig)
const bcrypt = require('bcryptjs');
const saltRounds = 10;

// Database
const mysql = require('mysql');
// Database connection info - used from environment variables
var dbInfo = {
    connectionLimit: 10,
    host: process.env.MYSQL_HOSTNAME,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
};

var connection = mysql.createPool(dbInfo);
console.log("Conecting to database...");
// connection.connect(); <- connect not required in connection pool

// SQL Database init.
// In this current demo, this is done by the "database.sql" file which is stored sin the "db"-container (./db/).
// Alternative you could use the mariadb basic sample and do the following steps here:
/*
connection.query("CREATE TABLE IF NOT EXISTS table1 (task_id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255) NOT NULL, description TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)  ENGINE=INNODB;", function (error, results, fields) {
    if (error) throw error;
    console.log('Answer: ', results);
});
*/
// See readme.md for more information about that.

// Check the connection
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


// Constants
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

// App
const app = express();

// Features for JSON Body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// handling CORS ////////////
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin",
        "http://localhost:4200");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});


app.get('/api/test', (req, res) => {
    connection.query("SELECT * FROM `MULTIPLAYER_SPIEL`", function (error, results, fields) {
        if (error) {
            console.error(error);
            res.status(500).json(error);
        } else {
            console.log('Success answer from DB: ', results);
            res.status(200).json(results);
        }
    });
});

app.post('/api/v1/multiplayer/erstellen', (req, res) => {
    if (typeof req.body !== "undefined") {
        var password = req.body.password;
        var budget = req.body.budget;
        var startDate = req.body.startDate;
        var endDate = req.body.endDate;

        startDate = startDate.substring(0, 11);
        endDate = endDate.substring(0, 11);

        connection.query("INSERT INTO `MULTIPLAYER_SPIEL` (`MULTIPLAYER_PASSWORT`, `BUDGET`, `ANFANGSZEITPUNKT`, `ENDZEITPUNKT`) VALUES ('" + password + "', '" + budget + "', '" + startDate + "', '" + endDate + "')",
            function (error, results, fields) {
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
    }
    else {
        // There is no body and post_contend
        console.error("Client send no 'post_content'")
        console.log('test');
        // Set HTTP Status -> 400 is client error -> and send message
        res.status(400).json({ message: 'This function requries a body with "post_content"' });
    }
});

app.post('/api/v1/multiplayer/beitreten', (req, res) => {
    if (typeof req.body !== "undefined") {
        var id = req.body.id;
        var password = req.body.password;

        connection.query("SELECT `MULTIPLAYER_PASSWORT` FROM `MULTIPLAYER_SPIEL` WHERE `MULTIPLAYER_SPIEL_ID` = " + id,
            function (error, results, fields) {
                if (error) {
                    // we got an errror - inform the client
                    console.error(error); // <- log error in server
                    res.status(500).json(error); // <- send to client
                } else {
                    if (results[0].MULTIPLAYER_PASSWORT == password) {
                        // Everything is fine with the query
                        console.log('Success answer: ', results); // <- log results in console
                        // INFO: Here can be some checks of modification of the result
                        res.status(200).json(results); // <- send it to client
                    } else {
                        console.log('Success answer: ', results); // <- log results in console
                        res.status(401).json({ message: 'Unauthorized' }); // <- send it to client
                    }
                }
            });
    }
    else {
        // There is no body and post_contend
        console.error("Client send no 'post_content'")
        console.log('test');
        // Set HTTP Status -> 400 is client error -> and send message
        res.status(400).json({ message: 'This function requries a body with "post_content"' });
    }
});

// HTTP-Zugriffe für login
app.post('/api/login', (req, res) => {

    console.log("Client sent following mail adress: " + req.body.email);
    var pw_correct = false;

    connection.query("SELECT EMAIL FROM `ACCOUNT` WHERE EMAIL = '" + req.body.email + "';", function (error, res_email, fields) {

        if (error) {
            console.error(error);
            res.status(500).json(error);
        }

        else {
            if (res_email.length == 0) {
                console.log("res_email.length = " + res_email.length)
                console.log("Kein Account zur Email gefunden.")
                res.status(400).json({ message: "Es konnte kein Account mit dieser Email Adresse gefunden werden!" });
            }

            else {
                if (res_email.length > 0) {
                    console.log("res_email.length = " + res_email.length)
                    connection.query("SELECT PASSWORT FROM `ACCOUNT` WHERE EMAIL = '" + req.body.email + "';", function (error, res_hash, fields) {

                        console.log("res_email.length = " + res_email.length)
                        bcrypt.compare(req.body.passwort, res_hash, function (err, compare_result) {
                            console.log("res_hash = " + res_hash)
                            console.log("eingegebenes pw = " + req.body.passwort)
                            compare_result = pw_correct;
                        })

                        if (pw_correct == true) {
                            res.status(200).json({ message: "Login erfolgreich!" });

                        }
                    })
                }
            }
        }
    });
});


// HTTP-Zugriffe für mein-account
app.get('/mein-account', (req, res) => {
    connection.query("SELECT * FROM `ACCOUNT`;", function (error, results, fields) {
        if (error) {
            console.error(error);
            res.status(500).json(error);
        } else {
            console.log('Success answer from DB: ', results);
            res.status(200).json(results);
        }
    });
});

// HTTP-Zugriffe für Registrierung
app.post('/api/registrierung/account-anlegen', (req, res) => {

    connection.query("SELECT SPIELERNAME, EMAIL FROM `ACCOUNT` WHERE SPIELERNAME = '" + req.body.spielername + "' OR EMAIL = '" + req.body.email +
        "';", function (error, res_duplikatPruef, fields) {

            if (error) {
                console.error(error);
                res.status(500).json(error);
            }

            else {
                // Email oder Spielername noch nicht vorhanden
                if (res_duplikatPruef.length == 0) {  //&& typeof req.body.spielername_validate !== "undefined" && typeof req.body.email_validate !== "undefined" && typeof req.body.passwort_validate !== "undefined")

                    console.log("DB hat nichts gefunden --> Email und Spielername noch nicht vergeben!")

                    var anrede = req.body.anrede;
                    var vorname = req.body.vorname;
                    var nachname = req.body.nachname;
                    var strasse = req.body.strasse;
                    var hausnummer = req.body.hausnummer;
                    var plz = req.body.plz;
                    var stadt = req.body.stadt;
                    var spielername = req.body.spielername;
                    var email = req.body.email;
                    var passwort = req.body.passwort;
                    var multiplayer_id = 0;
                    var multiplayer_id_int;

                    console.log("Client sendet DB insert request mit 'anrede': " + anrede + " ; vorname: " + vorname +
                        " ; nachname: " + nachname + " ; spielername: " + spielername + " ; email: " + email)

                    bcrypt.genSalt(saltRounds, function (err, salt) { //insert hashed password in DB
                        bcrypt.hash(passwort, salt, function (err, hash) {

                            connection.query("INSERT INTO `ACCOUNT` (`ACCOUNT_ID`, `ANREDE`, `VORNAME`, `NACHNAME`, `STRASSE`, `HAUSNUMMER`, `PLZ`, `STADT`, `SPIELERNAME`, `EMAIL`, `PASSWORT`, `ERSTELLT_AM`) VALUES (NULL, '"
                                + anrede + "', '" + vorname + "', '" + nachname + "', '" + strasse + "', '" + hausnummer + "', '" + plz + "', '" + stadt + "', '" + spielername + "', '" + email + "', '" + hash +
                                "', current_timestamp());", function (error, results, fields) {

                                    if (error) {

                                        console.error(error);
                                        res.status(500).json(error);

                                    } else {
                                        console.log("Account Eintrag erfolgreich erstellt, fehlt noch Multiplayer-Account");
                                        connection.query("SELECT `ACCOUNT_ID` FROM `ACCOUNT` WHERE `SPIELERNAME` = '" + req.body.spielername + "';", function (error, res_multID, fields) {
                                            multiplayer_id = res_multID[0].ACCOUNT_ID;
                                            //multiplayer_id_int = parseInt(multiplayer_id)
                                            console.log("Gefundene Account_ID für Multiplayer_ID = " + multiplayer_id)

                                            connection.query("INSERT INTO `MULTIPLAYER_ACCOUNT` (`MULTIPLAYER_ID`, `ERSTELLT_AM`) VALUES (" + multiplayer_id + ", current_timestamp());", function (error, results, fields) {

                                                if (error) {

                                                    console.error(error);
                                                    res.status(500).json(error);

                                                } else {
                                                    console.log("Multiplayer-Account ebenfalls erfolgreich erstellt");
                                                    console.log('Erfolgreiche Antwort der DB: ', results);
                                                    res.status(200).json("Erfolgreich registriert!");
                                                }
                                            });
                                        });
                                    }
                                });
                        });
                    });
                }

                else {
                    // Email oder Spielername schon vorhanden
                    if (res_duplikatPruef.length > 0) {
                        console.log("Duplikat vorhanden! Spielername in DB = " + res_duplikatPruef[0].SPIELERNAME + ", Spielername des Client = " + req.body.spielername)
                        console.log("Email in DB = " + res_duplikatPruef[0].EMAIL + ", Email des Client = " + req.body.email)

                        if (res_duplikatPruef[0].EMAIL == req.body.email) {
                            console.log("Email schon vorhanden!")
                            res.status(400).json({ message: "Email  '" + req.body.email + "'  schon vorhanden!" }); //zwischen server und client immer json format oder XML !!!!
                            // kann man hier bei einem res den Abbruch nicht erzwingen?
                        }

                        else {
                            if (res_duplikatPruef[0].SPIELERNAME == req.body.spielername)
                                console.log("Spielername schon vorhanden!")
                            res.status(400).json({ message: "Spielername  '" + req.body.spielername + "'  schon vorhanden!" }); //zwischen server und client immer json format oder XML !!!! 
                        }
                    }

                    else {
                        console.error("Client hat keine korrekten Daten gesendet!")
                        res.status(400).json({ message: 'Client hat keine korrekten Daten gesendet!!' });
                    }
                }
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