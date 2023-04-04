const express = require("express");
const validate = require("../helpers/validate");
const { talkValidation } = require("../validations");
const { talkController } = require("../controller");

const router = express.Router();

router.post("/", [validate(talkValidation.create)], talkController.createTalk);

router.patch("/:_id", [validate(talkValidation.get)], talkController.edit);

router.delete(
  "/:_id",
  [validate(talkValidation.get)],
  talkController.deleteTalk
);

router.get("/:id", talkController.listOne);

router.get("/", talkController.list);

module.exports = router;
