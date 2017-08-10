const Customer = require('../models/customer');

module.exports = {
get: (req, res) => {
  Customer.find({}).then((customers) => {
    res.json(customers);
  });
},

post:(req, res) => {
  const newCustomer = new Customer(req.body).save().then(customer => {
    res.status(201).json({});
    });
  }
};
