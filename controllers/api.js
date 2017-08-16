const Item = require('../models/item');

module.exports = {
get: (req, res) => {
  Item.find({}).then((items) => {
    res.json(items);
  });
},

post:(req, res) => {
  const newItem = new Item(req.body).save().then(item => {
    res.status(201).json({});
    });
  }
};
