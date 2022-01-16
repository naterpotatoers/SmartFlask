import express from "express";
import { Flask } from "../interfaces/flask.interface";
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
  res.send("Welcome to Flask Status page!");
});

flask.post("/", (req, res) => {
  res.jsonp(fullFlaskInfo);
});

flask.get("/status", (req, res) => {
  console.log(fullFlaskInfo);
  res.jsonp(fullFlaskInfo);
});
