import express from "express";
import { DriveRequest, DriveStatus } from "../interfaces/drive.interface";
export const drive = express.Router();

var driveCommands: DriveRequest = {
  heartbeat_count: 0,
  is_operational: 1,
  drive_mode: "S",
  speed: 0,
  angle: 0,
};

var driveStatus: DriveStatus = {
  heartbeat_count: 0,
  is_operational: 0,
  drive_mode: "S",
  battery: 0,
  left_wheel_speed: 0,
  left_wheel_angle: 0,
  right_wheel_speed: 0,
  right_wheel_angle: 0,
  back_wheel_speed: 0,
  back_wheel_angle: 0,
};

drive.get("/", (req, res) => {
  res.send("Hello Adrian");
});

drive.post("/", (req, res) => {
  driveCommands.is_operational = req.body.is_operational;
  driveCommands.drive_mode = req.body.drive_mode;
  driveCommands.speed = req.body.speed;
  driveCommands.angle = req.body.angle;
  driveCommands.heartbeat_count = 0;
  res.jsonp(driveCommands);
});

drive.get("/status", (req, res) => {
  console.log(driveStatus);
  res.jsonp(driveStatus);
});
