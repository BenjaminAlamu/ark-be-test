const express = require("express");
const validate = require("../helpers/validate");
const { attendeeController } = require("../controller");
const { attendeeValidation } = require("../validations");

const router = express.Router();

router.post(
  "/register",
  [validate(attendeeValidation.register)],
  attendeeController.register
);

router.get("/access/:talk", [validate(attendeeValidation.access)], attendeeController.checkAccess);

module.exports = router;
