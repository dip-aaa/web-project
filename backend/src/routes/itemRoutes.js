const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { createItem, getItems } = require("../controllers/itemController");

router.post("/", auth, createItem);
router.get("/", getItems);

module.exports = router;
