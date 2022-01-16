import express from "express";
import { User } from "../interfaces/user.interface";
import { connection } from "../index";
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
  const new_user = req.body;
  res.jsonp(userInfo);
  let query = `INSERT INTO user_table(email, password, flask_name, flask_size, user_weight, user_height, user_age, dietary_restrictions, daily_target_water_level) VALUES ('${new_user.email}', '${new_user.password}', '${new_user.flask_name}', ${new_user.flask_size}, ${new_user.user_weight}, ${new_user.user_height}, ${new_user.user_age}, '${new_user.dietary_restrictions}', ${new_user.daily_target_water_level})`;
  connection.query(query, function (err: Error, results) {
    if (err) throw err;
    res.json({
      results,
    });
  });
});

user.get("/", (req, res) => {
  let query = "SELECT * FROM user_table";
  connection.query(query, function (err: Error, results) {
    if (err) throw err;
    res.json({
      results,
    });
  });
});
