const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(
  path.join(__dirname, "../database/kosh.db"),
  (err) => {
    if (err) console.error(err);
    else console.log("SQLite connected");
  }
);

module.exports = db;
