const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
  sendMessage
} = require("../controllers/messageController");

// send message to another user
router.post("/send", auth, sendMessage);

module.exports = router;
