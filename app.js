const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// mongoose.Promise = require('bluebird');

const app = express();

const nodeEnv = process.env.NODE_ENV || "development";
const config = require("./config.json")[nodeEnv];

mongoose.connect(config.mongoURL);

app.get("/api/sanity", (req, res) => {
  res.json({hello: "annie"});
});

app.listen(3000);

module.exports = app;
