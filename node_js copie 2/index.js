const express = require("express");
const routes = require("./routes/start");
const app = express();
const port = 3000;
const cors = require("cors");
const ip = require("ip");
const ipAddr = ip.address();
const bodyParser = require("body-parser");

let lastHouseVisited = "Gryffondor";

app.use(cors());

//body parser json

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", routes);

app.get("/", (req, res) => {
  res.json({ message: lastHouseVisited });
});
app.post("/lastHouseVisited", (req, res) => {
  console.log(req.body);
  lastHouseVisited = req.body.house;
  res.json({ message: lastHouseVisited });
});
app.listen(3000, () => {
  console.log("Server run: http://" + ipAddr + ":3000");
});
