import * as express from "express";
import * as mysql from "mysql";
import dbConfig from "../db";

export const observationsController = express.Router();

observationsController.get('/observations', (_, res) => {

  const connection = mysql.createConnection(dbConfig);

  connection.connect((err: any) => {
      if (err) throw err;
      connection.query('SELECT * FROM events', (err: any, rows: any) => {
          if (err) throw err;
          res.status(200).json({
            data: rows
          });
        });
      connection.end();
  });
});
