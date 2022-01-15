import os from "os";
import express from "express";
import swaggerUi from "swagger-ui-express";

// import { default as swagger } from "./swagger.json";
import { drive } from "./routes/drive";
import { arm } from "./routes/arm";

const port = 5000;
const app = express().set("json spaces", 2);
const networkInterfaces = os.networkInterfaces();
console.log(networkInterfaces);

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// app.use("/", swaggerUi.serve, swaggerUi.setup(swagger));
app.get("/", (req, res) => {
  res.send("Mission Control Web Server - Built using ExpressJS");
});
app.use("/drive", drive);
app.use("/arm", arm);

app.listen(port, () => {
  console.log(`Server: http://localhost:5000`);
});
