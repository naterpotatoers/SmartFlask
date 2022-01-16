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
  let query = "SELECT * FROM flask_table";
  connection.query(query, function (err: Error, results) {
    if (err) throw err;
    res.json({
      results,
    });
  });
});

flask.post("/", (req, res) => {
  const new_user = req.body;
  res.jsonp(fullFlaskInfo);
  let query = `INSERT INTO flask_table(timestamp_id, water_level, water_temperature, water_consumed, time_tilted, flask_gps, flask_name) VALUES ('${new_user.timestamp_id}', '${new_user.water_level}', '${new_user.water_temperature}', '${new_user.water_consumed}', '${new_user.time_tilted}', '${new_user.flask_gps}', '${new_user.flask_name}')`;
  connection.query(query, function (err: Error, results) {
    if (err) throw err;
    res.json({
      results,
    });
  });
});
