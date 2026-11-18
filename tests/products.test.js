// tests/products.test.js
// Jest + supertest tests for the GET /foods endpoint.
// supertest lets us send fake HTTP requests to the app without starting a real server.

const request = require("supertest");
const app = require("../server/server");
const db = require("../server/db");

describe("GET /foods", () => {
  // Test 1: the endpoint answers with status 200 and JSON
  test("returns status 200 and JSON", async () => {
    const res = await request(app).get("/foods");
    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
  });

  // Test 2: the response is an array with exactly five food items
  test("returns an array of 5 foods", async () => {
    const res = await request(app).get("/foods");
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(5);
  });

  // Test 3: each food has an id, a name and a price
  test("each food has id, name and price", async () => {
    const res = await request(app).get("/foods");
    res.body.forEach((food) => {
      expect(food).toHaveProperty("id");
      expect(food).toHaveProperty("name");
      expect(typeof food.price).toBe("number");
    });
  });
});

describe("Singleton database", () => {
  // Test 4: getAll() returns the five foods
  test("getAll() returns 5 items", () => {
    expect(db.getAll()).toHaveLength(5);
  });
});

describe("404 handling", () => {
  // Test 5: an unknown route returns status 404 with an error message
  test("unknown route returns 404", async () => {
    const res = await request(app).get("/does-not-exist");
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: "Not Found" });
  });
});
