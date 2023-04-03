/* eslint-disable prettier/prettier */
const { User, Attendee } = require("../models");
const ApiError = require("../helpers/ApiError");

const registerForEvent = async (data) => {
  try {
    const {firstName, lastName, email, talk} = data
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({firstName, lastName, email});
    }
    const attendee = await Attendee.create({user, talk})
    return JSON.parse(JSON.stringify(attendee));
  } catch (error) {
    throw new ApiError(error.code || 500, error.message || error);
  }
};

const checkRegister = async (criteria) => {
  try {
    const {email, talk} = criteria
    const user = await User.findOne({ email });
    const attendee = await Attendee.findOne({ user, talk })

    if (!attendee) {
      throw new ApiError(404, "You have not registered for this event. Please register");
    }
    return JSON.parse(JSON.stringify(attendee));
  } catch (error) {
    throw new ApiError(
      error.code || error.statusCode || 500,
      error.message || error
    );
  }
};

const count = async (criteria = {}) => {
  return await Attendee.find(criteria).countDocuments();
};

module.exports = {
  registerForEvent,
  checkRegister,
  count
};
