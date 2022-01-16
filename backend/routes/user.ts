import express from "express";
import { User } from "../interfaces/user.interface";
export const user = express.Router();

// WILL BE USED FOR THE WATER INFO

var userInfo: User = {
  email: "",
  password: "",
  flask_name: "",
  flask_size: 0,
  user_weight: 0,
  user_height: 0,
  user_age: 0,
  dietary_restrictions: "",
  daily_target_water_level: 0,
};

user.post("/", (req, res) => {
  res.jsonp(userInfo);
});

user.get("/", (req, res) => {
  console.log(userInfo);
  res.jsonp(userInfo);
});
