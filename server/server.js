// server/server.js
// Express backend for the Full Stack Proof-of-Concept.
// It serves the frontend from /public and exposes one API route: GET /foods.

const express = require("express");
const path = require("path");
const db = require("./db"); // the singleton mock database

const app = express();

// JSON middleware: lets Express read and parse JSON request bodies.
// (This POC only has a GET route, but the middleware is part of the setup.)
app.use(express.json());

// Simple request logger so we can see what the server is doing in the terminal.
// This helps with debugging: every request prints its method and URL.
app.use((req, res, next) => {
  console.log(`[request] ${req.method} ${req.url}`);
  next(); // pass control to the next middleware or route
});

// Serve the frontend files (public/index.html) as static files.
app.use(express.static(path.join(__dirname, "..", "public")));

// GET /foods
// Returns all food items from the singleton database as JSON.
// Status codes:
//   200 OK                    - the foods were returned
//   500 Internal Server Error - something unexpected went wrong
app.get("/foods", (req, res) => {
  try {
    const foods = db.getAll();
    console.log(`[GET /foods] returning ${foods.length} items`);
    res.status(200).json(foods);
  } catch (err) {
    console.error("[GET /foods] error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 404 handling.
// This runs only if no earlier route or static file matched the request.
app.use((req, res) => {
  console.log(`[404] ${req.method} ${req.url} not found`);
  res.status(404).json({ error: "Not Found" });
});

// Dynamic port: use the port given by the hosting platform (process.env.PORT)
// or fall back to 3000 when running locally.
const PORT = process.env.PORT || 3000;

// Only start listening when this file is run directly (npm start).
// When the test file imports this app, it does NOT open a real port.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export the app so supertest can test it.
module.exports = app;
