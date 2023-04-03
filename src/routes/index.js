const express = require("express");
const router = new express.Router();

const talkRouter = require("./talk.route");
const attendeeRouter = require("./attendee.route");

router.use("/talk", talkRouter);
router.use("/user", attendeeRouter);

module.exports = router;
