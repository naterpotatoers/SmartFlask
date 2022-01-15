import express from "express";
import { ArmRequest, ArmStatus } from "../interfaces/arm.interface";
export const arm = express.Router();

var armCommands: ArmRequest = {
  heartbeat_count: 0,
  is_operational: 1,
  arm_speed: 0,
  rotunda_angle: 0,
  shoulder_angle: 0,
  elbow_angle: 0,
  wrist_roll: 0,
  wrist_pitch: 0,
  pinky_angle: 0,
  ring_angle: 0,
  middle_angle: 0,
  pointer_angle: 0,
  thumb_angle: 0,
}

var armStatus: ArmStatus = {
  heartbeat_count: 0,
  is_operational: 1,
  arm_speed: 0,
  battery: 0,
  rotunda_angle: 0,
  shoulder_angle: 0,
  elbow_angle: 0,
  wrist_roll: 0,
  wrist_pitch: 0,
  pinky_angle: 0,
  ring_angle: 0,
  middle_angle: 0,
  pointer_angle: 0,
  thumb_angle: 0,
}

arm.get("/", (req, res) => {
  armStatus.is_operational = Number(req.query.is_operational);
  armStatus.arm_speed = Number(req.query.arm_speed);
  armStatus.battery = Number(req.query.battery);
  armStatus.rotunda_angle = Number(req.query.rotunda_angle);
  armStatus.shoulder_angle = Number(req.query.shoulder_angle);
  armStatus.elbow_angle = Number(req.query.elbow_angle);
  armStatus.wrist_roll = Number(req.query.wrist_roll);
  armStatus.wrist_pitch = Number(req.query.wrist_pitch);
  armStatus.pinky_angle = Number(req.query.pinky_angle);
  armStatus.ring_angle = Number(req.query.ring_angle);
  armStatus.middle_angle = Number(req.query.middle_angle);
  armStatus.pointer_angle = Number(req.query.pointer_angle);
  armStatus.thumb_angle = Number(req.query.thumb_angle);
  armCommands.heartbeat_count = Number(req.query.heartbeat_count);
  console.log("Query Params:  ", req.query);
  console.log("Returned Commands: ", armCommands);
  res.jsonp(armCommands);
});

arm.post("/", (req, res) => {
  armCommands.is_operational = req.body.is_operational;
  armCommands.arm_speed = req.body.arm_speed;
  armCommands.rotunda_angle = req.body.rotunda_angle;
  armCommands.shoulder_angle = req.body.shoulder_angle;
  armCommands.elbow_angle = req.body.elbow_angle;
  armCommands.wrist_roll = req.body.wrist_roll;
  armCommands.wrist_pitch = req.body.wrist_pitch;
  armCommands.pinky_angle = req.body.pinky_angle;
  armCommands.ring_angle = req.body.ring_angle;
  armCommands.middle_angle = req.body.middle_angle;
  armCommands.pointer_angle = req.body.pointer_angle;
  armCommands.thumb_angle = req.body.thumb_angle;
  armCommands.heartbeat_count = 0;
  res.jsonp(armCommands);
});

arm.get("/status", (req, res) => {
  console.log(armStatus);
  res.jsonp(armStatus);
});