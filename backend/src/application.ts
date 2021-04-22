import * as express from "express";
import mysql = require('mysql');
require('dotenv').config();
import {pingController} from "./controllers/ping";

const app = express();
console.log('testing', process.env.HOST)

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: "test-read",
    password: process.env.DB_PASSWORD,
    port: 3306
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.end();
});


app.use(pingController);

export default app;


