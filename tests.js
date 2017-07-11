
const expect = require('chai').expect;
const request = require('supertest');
const app = require("./app");
const Customer = require("./models/customer");
const Vendor = require("./models/vendor");

describe("basic model tests", () => {

  beforeEach((done) => {
    Customer.deleteMany({}).then(done());
  });

  afterEach((done) => {
    Customer.deleteMany({}).then(done());
  });

  it("test should clean up after itself", (done) => {
    const customer = new Customer().save().then(newCustomer => {
      Customer.count().then(count => {
        expect(count).to.equal(1);
        done();
      });
    });
  });

it("can create a customer list in db and find it with mongoose syntax", (done) => {
  const customer = new Customer({item: "chips", cost: 65, quantity: 1})
  .save().then(newCustomer => {
    expect(newCustomer.item).to.equal("chips");
    expect(newCustomer.cost).to.equal(65);
    expect(newCustomer.quantity).to.equal(1);
  });
  done();
});

describe("basic api endpoint tests", () => {
  it("can access api endpoint and get success back", (done) => {
    request(app)
      .get("/api/sanity")
      .expect(200, {hello: "annie"}, done);
  });
});

describe("sanity test", () => {
  it("should run test", () => {
    expect(1).to.not.equal(2);
  });
});
});
