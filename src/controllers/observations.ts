import * as express from "express";
import * as mysql from "mysql";
import dbConfig from "../db";

export const observationsController = express.Router();

// function uniq(a: any) {
//   return a.sort().filter((item: string, pos: number , ary: string[]) => {
//       return !pos || item != ary[pos - 1];
//   });
// }

interface Row {
  payload: {
    event_type: string
  };
  timestamp: string;
}

observationsController.get('/observations/recipient', (req, res) => {

  //takes 3 parameters as query string, recipient id, type to filter by type (optional), and a page number (optional)

  const { recipient, page, type } = req.query;
  const connection = mysql.createConnection(dbConfig);

  connection.connect((err: any) => {
      if (err) throw err;

      connection.query('SELECT payload, timestamp FROM events WHERE care_recipient_id="' + recipient + '" ORDER BY timestamp ASC', (err: any, rows: any) => {
          if (err) throw err;

          let results = rows.map((row: { payload: string; timestamp: string; }) => {
            return {
              payload: JSON.parse(row.payload),
              timestamp: row.timestamp
            }
          })
          
          if(type){
            results = results.filter((row: Row) => {
              return row.payload.event_type == type
            })
          }
          
          if(page){
            let pageNumber = parseInt(<string>page);
            let firstRow = 20 * pageNumber; 
            results = results.slice(firstRow, firstRow + 20)
          }

          return res.status(200).json(results)
        });
      connection.end();
  });
});

//ALL TYPES OF OBSERVATION

// [
//   "alert_qualified",
//   "alert_raised",
//   "catheter_observation",
//   "check_in",
//   "check_out",
//   "concern_raised",
//   "fluid_intake_observation",
//   "food_intake_observation",
//   "general_observation",
//   "incontinence_pad_observation",
//   "medication_schedule_created",
//   "medication_schedule_updated",
//   "mental_health_observation",
//   "mood_observation",
//   "no_medication_observation_received",
//   "physical_health_observation",
//   "regular_medication_maybe_taken",
//   "regular_medication_not_taken",
//   "regular_medication_partially_taken",
//   "regular_medication_taken",
//   "task_completed",
//   "task_completion_reverted",
//   "task_schedule_created",
//   "toilet_visit_recorded",
//   "visit_cancelled",
//   "visit_completed"
// ]