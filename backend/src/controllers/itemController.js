const db = require("../config/db");

exports.createItem = (req, res) => {
  const { title, description, price } = req.body;

  db.run(
    "INSERT INTO items (title, description, price, user_id) VALUES (?, ?, ?, ?)",
    [title, description, price, req.user.id],
    function () {
      res.json({ id: this.lastID });
    }
  );
};

exports.getItems = (req, res) => {
  db.all("SELECT * FROM items", [], (err, rows) => {
    res.json(rows);
  });
};          
