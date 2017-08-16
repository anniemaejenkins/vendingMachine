//customer vend list, what they can see
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  item: String,
  cost: Number,
  quantity: Number,
  numberOfPurchases: Number,
  purchaseDate: [Date],
  description: String
  // current items,
  // cost,
  // quanitity
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
