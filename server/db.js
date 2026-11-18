// server/db.js
// In-memory "mock database" built as a singleton.
// A singleton means only ONE instance of this database ever exists.
// Every file that does require("./db") gets that same instance,
// so all parts of the app share the same data.

class FoodDatabase {
  constructor() {
    // If an instance was already created, return it instead of making a new one.
    if (FoodDatabase.instance) {
      return FoodDatabase.instance;
    }

    // The data lives in memory only. It is lost when the server stops.
    // Five food items, each with an id, a name and a price.
    this.foods = [
      { id: 1, name: "Apple", price: 1.25 },
      { id: 2, name: "Bread", price: 3.49 },
      { id: 3, name: "Cheese", price: 5.99 },
      { id: 4, name: "Eggs", price: 4.25 },
      { id: 5, name: "Milk", price: 4.99 },
    ];

    // Remember this instance so the next call to "new FoodDatabase()" reuses it.
    FoodDatabase.instance = this;
  }

  // getAll() returns every food item in the database.
  // It returns a copy of the array so outside code cannot change the original data.
  getAll() {
    return [...this.foods];
  }
}

// Create the single instance and export it.
// Other files import this ready-made object (they never call "new" themselves).
const instance = new FoodDatabase();
module.exports = instance;
