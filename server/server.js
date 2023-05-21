const express = require("express");
const mongoose = require("mongoose");
const app = express();

const MongoDB = "mongodb://localhost/botairdb";

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

app.post("/save_to_db", function (req, res) {
  const airdatamodel = new AirDataModel({
    username: req.params.username,
    speed: req.params.speed,
    direction: req.params.direction,
  });
  airdatamodel.save();
});

app.listen(3010);
