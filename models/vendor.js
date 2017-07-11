//vendor vend list, what they can supertest

const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  // totalmoney,
  // purchase,
  // timeofPurchase,
  // update customerlist,
  // addNewItem

});

const Vendor = mongoose.model("Vendor", vendorSchema);
