const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Customer = require('./models/customer');
const Vendor = require('./models/vendor');
mongoose.Promise = require('bluebird');


const app = express();

const nodeEnv = process.env.NODE_ENV || "development";
const config = require("./config.json")[nodeEnv];

app.use(bodyParser.json());
mongoose.connect(config.mongoURL);

app.get("/api/customer/item", (req, res) => {
  Customer.find({}).then((customers) => {
    res.json(customers);
  });
});

app.post("/api/customer", (req, res) => {
  const newCustomer = new Customer(req.body).save().then(customer => {
    res.status(201).json({})
  });
});


app.get("/api/sanity", (req, res) => {
  res.json({hello: "annie"});
});

app.listen(3000);

module.exports = app;
