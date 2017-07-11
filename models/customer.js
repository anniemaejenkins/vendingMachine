//customer vend list, what they can see
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  item: String,
  cost: Number,
  quantity: Number
  // current items,
  // cost,
  // quanitity
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
