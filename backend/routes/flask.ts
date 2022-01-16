import express from "express";
import { Flask } from "../interfaces/flask.interface";
import { connection } from "../index";
export const flask = express.Router();

// WILL BE USED FOR THE FLASK

var fullFlaskInfo: Flask = {
  timestamp_id: 0,
  water_level: 0,
  water_temperature: 0,
  water_consumed: 0,
  time_tilted: 0,
  flask_gps: 0,
  flask_name: "",
};

flask.get("/", (req, res) => {
  let query = "SELECT * FROM flask_table_v2";
  connection.query(query, function (err: Error, results) {
    if (err) throw err;
    results = results[0];
    res.json({
      results,
    });
  });
});

flask.post("/", (req, res) => {
  const new_flask = req.body;
  let query = `INSERT INTO flask_table_v2(water_level, water_temperature, water_consumed, time_tilted, flask_gps, flask_name) VALUES ('${new_flask.water_level}', '${new_flask.water_temperature}', '${new_flask.water_consumed}', '${new_flask.time_tilted}', '${new_flask.flask_gps}', '${new_flask.flask_name}')`;
  connection.query(query, function (err: Error, results) {
    if (err) throw err;
    res.json({
      results,
    });
  });
});
