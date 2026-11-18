# LeonardoCamargoPOC

Full Stack Application Proof-of-Concept (CST8326 Web Programming, Assignment 3).

**Disclaimer:** this application is student work and is for demonstrating web development skills only.

## Run locally
```
npm install
npm start
```
Open http://localhost:3000 (the port can be changed with the PORT environment variable).

## Test
```
npm test
```

## Structure
- `server/db.js` - singleton in-memory mock database with `getAll()` (5 food items with prices)
- `server/server.js` - Express app: JSON middleware, `GET /foods`, 404 handling, dynamic port
- `public/index.html` - fetches `/foods` and shows them in a minimally styled table
- `tests/products.test.js` - Jest + supertest tests
