// products.test.js
// Tests for the backend using Jest and supertest.
// supertest sends fake requests to the app without opening a real port.

const request = require("supertest");
const app = require("../server/server");
const db = require("../server/db");

// Test 1: GET /foods answers with status 200
test("GET /foods returns status 200", function () {
  return request(app)
    .get("/foods")
    .then(function (res) {
      expect(res.statusCode).toBe(200);
    });
});

// Test 2: the response has 5 foods
test("GET /foods returns 5 foods", function () {
  return request(app)
    .get("/foods")
    .then(function (res) {
      expect(res.body.length).toBe(5);
    });
});

// Test 3: each food has a name and a price
test("each food has a name and a price", function () {
  return request(app)
    .get("/foods")
    .then(function (res) {
      res.body.forEach(function (food) {
        expect(food).toHaveProperty("name");
        expect(food).toHaveProperty("price");
      });
    });
});

// Test 4: the singleton gives back the same database every time
test("getInstance() always returns the same database", function () {
  expect(db.getInstance()).toBe(db.getInstance());
});

// Test 5: an unknown URL gives status 404
test("unknown route returns 404", function () {
  return request(app)
    .get("/does-not-exist")
    .then(function (res) {
      expect(res.statusCode).toBe(404);
    });
});
