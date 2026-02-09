const express = require("express");


const itemRoutes = require("./itemRoutes");
const mentorshipRoutes = require("./mentorshipRoutes");
const messageRoutes = require("./messageRoutes");

const router = express.Router();


router.use("/items", itemRoutes);
router.use("/mentorship", mentorshipRoutes);
router.use("/messages", messageRoutes);

module.exports = router;