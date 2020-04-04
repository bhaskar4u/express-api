const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { endpoint, masterKey, mongoURI, port } = require("./config");
const ApiRoute = require("./router/router");
const app = express();

mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log("MongoDb Not Connected", err);
    } else {
      console.log("MongoDb Connected Successfully");
    }
  }
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/user", ApiRoute);

app.listen(port, (err) => {
  if (err) {
    console.log("server not Started", err);
  }
  console.log("Server Started  Port:", port);
});

module.exports = app;
