const db = require("../config/db");

exports.requestMentorship = (req, res) => {
  db.run(
    "INSERT INTO mentorships (junior_id, senior_id, status) VALUES (?, ?, 'pending')",
    [req.user.id, req.body.senior_id],
    () => res.json({ message: "Request sent" })
  );
};
const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
  requestMentorship
} = require("../controllers/mentorshipController");

// junior → send mentorship request to senior
router.post("/request", auth, requestMentorship);

module.exports = router;
