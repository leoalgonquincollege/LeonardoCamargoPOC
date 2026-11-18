// db.js
// This is my mock database. It uses the Singleton pattern.
// Singleton means only ONE copy of the database is ever created,
// and every file that uses it shares that same copy.

class Database {
  constructor() {
    // The data is stored in an array (it is lost when the server stops).
    // 5 foods, each with an id, a name and a price.
    this.foods = [
      { id: 1, name: "Apple", price: 1.25 },
      { id: 2, name: "Bread", price: 3.49 },
      { id: 3, name: "Cheese", price: 5.99 },
      { id: 4, name: "Eggs", price: 4.25 },
      { id: 5, name: "Milk", price: 4.99 },
    ];
  }

  // getAll() returns every food in the database
  getAll() {
    return this.foods;
  }
}

// This variable holds the one and only database.
let instance = null;

// getInstance() makes the database the first time it is called.
// After that, it gives back the same one every time.
function getInstance() {
  if (instance === null) {
    instance = new Database();
  }
  return instance;
}

module.exports = { getInstance };
