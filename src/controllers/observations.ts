import * as express from "express";
import * as mysql from "mysql";
import dbConfig from "../db";

export const observationsController = express.Router();

interface RowParsed {
  payload: {
    event_type: string
  };
  timestamp: string;
}

interface Row {
  payload: string;
  timestamp: string;
}

interface Count { 
  [key: string]: number; 
}

observationsController.get('/observations', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  //QUERY STRINGS

  // recipient - the recipient id
  // type - the observation event type, to filter accordingly
  // page - 20 elements per page, first page is page 0, returns first 20 (ordered by date)
  // count - if anything given, it returns a tally of all the observation event types instead

  const { recipient, page, type, count } = req.query;

  const connection = mysql.createConnection(dbConfig);

  connection.connect((err: any) => {
      if (err) throw err;

      //GET ALL DATA FOR RECIPIENT, ORDER BY DATE

      connection.query('SELECT payload, timestamp FROM events WHERE care_recipient_id="' + recipient + '" ORDER BY timestamp ASC', (err: any, rows: any) => {
          if (err) throw err;

          //PARSE RESULTS (as payload given as string)

          let results = rows.map((row: Row) => {
            return {
              payload: JSON.parse(row.payload),
              timestamp: row.timestamp
            }
          })

          //IF ANYTHING GIVEN FOR COUNT, RETURN TALLY OF EACH OBSERVATION TYPE INSTEAD

          if(count){
            let observationCount = <Count>{};
            results.forEach((row: RowParsed) => {
                let type = row.payload.event_type;
                if(type in observationCount){
                  observationCount[type]++;
                }else{
                  observationCount[type] = 1;
                }
            })
            return res.status(200).json(observationCount)
          }

          //IF ANYTHING GIVEN FOR TYPE IN QUERY STRING, FILTER ACCORDINGLY
          
          if(type){
            results = results.filter((row: RowParsed) => {
              return row.payload.event_type == type
            })
          }

          //IF ANY PAGE GIVEN IN QUERY STRING, FILTER ACCORDINGLY
          
          if(page){
            let pageNumber = parseInt(<string>page);
            let firstRow = 20 * pageNumber; 
            results = results.slice(firstRow, firstRow + 20)
          }

          //RETURN RESULTS

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