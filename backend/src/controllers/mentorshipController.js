const db = require("../config/db");

exports.requestMentorship = (req, res) => {
  db.run(
    "INSERT INTO mentorships (junior_id, senior_id, status) VALUES (?, ?, 'pending')",
    [req.user.id, req.body.senior_id],
    () => res.json({ message: "Request sent" })
  );
};
