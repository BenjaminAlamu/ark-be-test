const catchAsync = require("../helpers/catchAsync");
const { attendeeService } = require("../services");
const ApiError = require("../helpers/ApiError");
const pick = require("../helpers/pick");

const register = catchAsync(async function (req, res) {
  const registration = await attendeeService.registerForEvent(req.body);
  res.status(201).send({
    message: "Registration successful",
    data: {
      registration,
    },
  });
});

const checkAccess = catchAsync(async function (req, res) {
  const access = await attendeeService.checkRegister({...req.params._id});

  res.status(200).send({
    message: "Talk access checked successfully",
    data: {
      access,
    },
  });
});


module.exports = {
  register,
  checkAccess
};
