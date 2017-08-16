const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Item = require('./models/item');
mongoose.Promise = require('bluebird');


const app = express();

const nodeEnv = process.env.NODE_ENV || "development";
const config = require("./config.json")[nodeEnv];

app.use(bodyParser.json());
mongoose.connect(config.mongoURL);

app.get("/api/customer/item", (req, res) => {
  Item.find({}).then((items) => {
    res.json(items);
  });
});

app.get("/api/vendor/purchases", (req, res) => {
  Item.find({numberOfPurchases: {$gt: 0}}).then((items) => {
    res.json(items)
  });
});


app.post("/api/customer", (req, res) => {
  const newItem = new Item(req.body).save().then(item => {
    res.status(201).json({})
  });
});

app.post("/api/vendor/items", (req, res) => {
  let newItem = new Item(req.body).save().then(item => {
    res.json(item);
  });
});

app.post("/api/customer/items/:id/purchases", (req, res) => {
  let id = req.params.id;
  let moneyGiven = req.body.moneyGiven;
  let change = 0;
  let purchaseDate = Date.now();
  Item.findById(id).then(item => {
    if(moneyGiven < item.cost){
      return res.json({message: "Not enough money"});
    } else if (moneyGiven > item.cost){
      change = moneyGiven - item.cost;
      item.purchaseDate.push(purchaseDate);
      item.quantity -= 1;
      item.numberOfPurchases += 1;
      item.save();
      res.json({item: item, change: change});
    } else {
      item.purchaseDate.push(purchaseDate);
      item.quantity -= 1;
      item.numberOfPurchases += 1;
      item.save();
      res.json({item: item, change: 0});
    }
  });
});

app.patch("/api/vendor/items/:id", (req, res) => {
  let id = req.params.id;
  Item.findByIdAndUpdate(id).then(item => {
    item.quantity = req.body.quantity;
    item.description = req.body.description;
    item.cost = req.body.cost;
    item.save();
    res.json(item);
  });
});


app.get("/api/sanity", (req, res) => {
  res.json({hello: "annie"});
});

app.listen(3000);

module.exports = app;
