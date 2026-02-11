const db = require("../config/db");

exports.sendMessage = (req, res) => {
  const { receiver_id, message } = req.body;

  db.run(
    "INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)",
    [req.user.id, receiver_id, message],
    () => res.json({ message: "Message sent" })
  );
};
