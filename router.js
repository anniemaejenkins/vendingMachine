const apiController = require('./controllers/api') ;

module.exports = function (app) {
  app.get("/api/customer", apiController.get);
  app.post("/api/customer", apiController.post);
  app.get("/api/customer/item", apiController.get);
  app.post("/api/customer/item", apiController.post);
};
