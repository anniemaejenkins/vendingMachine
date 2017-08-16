
const expect = require('chai').expect;
const request = require('supertest');
const app = require("./app");
const Item = require("./models/item");

describe("basic api endpoint data tests", () => {

   beforeEach(done => {
     Item.insertMany([
       {item: "chips", cost: 65, quantity: 3, numberOfPurchases: 0},
       {item: "gum", cost: 100,  quantity: 2, numberOfPurchases: 0},
       {item: "drink", cost: 125, quantity: 10, numberOfPurchases: 0}
     ]).then(() => {
       done()
     });
   });

   afterEach(done => {
     Item.deleteMany({}).then(() => {
       done();
     });
   });

   it("customers api endpoint allows creation of customer lists", (done) => {
     request(app)
       .post("/api/customer")
       .send({item: "candy", cost: 150, quantity: 5})
       .expect(201)
       .expect(res => {
         Item.count().then(count => {
           expect(count).to.equal(4);
         });
       })
       .end(done);
   });

   it("customers api endpoint returns all customers as json", (done) => {
     request(app)
       .get("/api/customer/item")
       .expect(200)
       .expect(res => {
         expect(res.body[0].item).to.equal("chips");
         expect(res.body[1].item).to.equal("gum");
         expect(res.body[2].item).to.equal("drink");
         expect(res.body.length).to.equal(3);
       }).end(done);
   });

   // THIS TEST IS RELIGION!
   it("should tell me not enough money if i dont send enough money", (done) => {
     Item.findOne({item: "chips"}).then((chips) => {
       request(app)
        .post("/api/customer/items/" + chips._id + "/purchases")
        .send({moneyGiven: 50})
        .expect(res => {
          expect(res.body.message).to.equal("Not enough money")
        }).end(done);
     });
   });

   it("should give change if it gets too much money", (done) => {
    Item.findOne({item: "chips"}).then((chips) => {
      request(app)
       .post("/api/customer/items/" + chips._id + "/purchases")
       .send({moneyGiven: 90})
       .expect(res => {
        //  console.log(res.body);
         expect(res.body.change).to.equal(25);
       }).end(done);
    });
  });

  it("should drop the quantity when purchased", (done) => {
    Item.findOne({item: "chips"}).then((chips) => {
      request(app)
      .post("/api/customer/items/" + chips._id + "/purchases")
      .send({moneyGiven: 65})
      .expect(res => {
        // console.log(res.body);
        expect(res.body.item.quantity).to.equal(2);
      }).end(done);
    });
  });

  it("should add to the numberOfPurchases when purchased", (done) => {
    Item.findOne({item: "chips"}).then((chips) => {
      request(app)
      .post("/api/customer/items/" + chips._id + "/purchases")
      .send({moneyGiven: 70})
      .expect(res => {
        console.log(res.body);
        expect(res.body.item.numberOfPurchases).to.equal(1);
      }).end(done);
    });
  });
});

describe("basic model tests", () => {

  beforeEach((done) => {
    Item.deleteMany({}).then(done());
  });

  afterEach((done) => {
    Item.deleteMany({}).then(done());
  });

  it("test should clean up after itself", (done) => {
    const item = new Item().save().then(newItem => {
      Item.count().then(count => {
        expect(count).to.equal(1);
        done();
      });
    });
  });

it("can create a customer list in db and find it with mongoose syntax", (done) => {
  const item = new Item({item: "chips", cost: 65, quantity: 1})
  .save().then(newItem => {
    expect(newItem.item).to.equal("chips");
    expect(newItem.cost).to.equal(65);
    expect(newItem.quantity).to.equal(1);
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
