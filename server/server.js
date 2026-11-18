// server.js
// Express backend for my full stack proof-of-concept.
// It has one API route: GET /foods

const express = require("express");
const path = require("path");
const db = require("./db");

const app = express();

// get the single database instance
const database = db.getInstance();

// JSON middleware so Express can read JSON data
app.use(express.json());

// Log every request in the terminal
app.use(function (req, res, next) {
  console.log(req.method + " " + req.url);
  next();
});

// Serve the frontend files from the public folder
app.use(express.static(path.join(__dirname, "..", "public")));

// GET /foods - send back all the foods as JSON
// Status 200 means OK
app.get("/foods", function (req, res) {
  const foods = database.getAll();
  console.log("Sending " + foods.length + " foods");
  res.status(200).json(foods);
});

// 404 handling - this runs when no route above matched
// Status 404 means Not Found
app.use(function (req, res) {
  console.log("404 - not found: " + req.url);
  res.status(404).json({ error: "Not Found" });
});

// Dynamic port: use the hosting port if there is one, otherwise 3000
const PORT = process.env.PORT || 3000;

// Don't start the server during tests (Jest sets NODE_ENV to "test")
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, function () {
    console.log("Server running on port " + PORT);
  });
}

// Export the app so the tests can use it
module.exports = app;
