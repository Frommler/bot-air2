const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const MongoDB = "mongodb://localhost/botairdb";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(MongoDB);
const db = mongoose.connection;
db.once("open", () => {
  console.log("DB connected");
});

const AirDataModel = mongoose.model("airdata", {
  username: String,
  speed: Number,
  direction: Number,
});

app.post("/save_to_db", async function (req, res) {
  const airdatamodel = new AirDataModel(req.body);
  let airdata = await airdatamodel.save();
  res.json(airdata);
});
//TODO check save to DB
app.listen(3010);
