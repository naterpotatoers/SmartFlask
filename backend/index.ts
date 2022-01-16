import os from "os";
import express from "express";
import swaggerUi from "swagger-ui-express";
import mysql from "mysql";

// import { default as swagger } from "./swagger.json";
import { flask } from "./routes/flask";
import { user } from "./routes/user";

const port = 5000;
const app = express().set("json spaces", 2);
const networkInterfaces = os.networkInterfaces();
console.log(networkInterfaces);

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

export const connection = mysql.createConnection({
  host: "34.94.176.177",
  user: "root",
  password: "theRe4lAdrian",
  database: "smartflaskV1",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL Database!");
});

// app.use("/", swaggerUi.serve, swaggerUi.setup(swagger));
app.get("/", (req, res) => {
  res.send("Welcome to SmartFlask! By Adrian, Adrien, Nate, and Weston");
});
app.use("/flask", flask);
app.use("/user", user);

app.listen(port, () => {
  console.log(`Server: http://localhost:5000`);
});
