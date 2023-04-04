/* eslint-disable prettier/prettier */
const { Talk } = require("../models");
const ApiError = require("../helpers/ApiError");
const slugify = require("slugify");
const { randomNumber } = require("../helpers/utils");
const cloudinaryHelper = require("../helpers/cloudinary");

const createTalk = async (data) => {
  try {
    const check = await Talk.findOne({ name: data.name });
    if (check) {
      throw new ApiError(404, "Talk already exists");
    }
    const image = await cloudinaryHelper.uploadImage(data.image);
    if (!image) {
      throw new ApiError(
        400,
        "An error occured when uploading your file, please try again"
      );
    }
    const talk = await Talk.create({
      ...data,
      image,
      slug: slugify(`${data.name}-${randomNumber(20)}`),
    });
    return JSON.parse(JSON.stringify(talk));
  } catch (error) {
    throw new ApiError(
      error.code || error.statusCode || 500,
      error.message || error
    );
  }
};

const findOne = async (criteria) => {
  try {
    const talk = await Talk.findOne({ ...criteria });
    if (!talk || talk.isDeleted) {
      throw new ApiError(404, "Talk not found");
    }
    return JSON.parse(JSON.stringify(talk));
  } catch (error) {
    throw new ApiError(
      error.code || error.statusCode || 500,
      error.message || error
    );
  }
};

const fetchAll = async (criteria = {}, options = {}) => {
  const { sort = { createdAt: -1 }, limit, page } = options;

  const _limit = parseInt(limit, 10);
  const _page = parseInt(page, 10);

  let talk = await Talk.find(criteria)
    .sort(sort)
    .limit(_limit)
    .skip(_limit * (_page - 1));

  return { talk, page: _page };
};

const count = async (criteria = {}) => {
  return await Talk.find(criteria).countDocuments();
};

const updateTalk = async (talkId, data) => {
  let talk = await Talk.findById(talkId);
  let image = data.image;
  const isNewImage = !image.startsWith("https");
  if (image && isNewImage) {
    // A new image was uploaded
    image = await cloudinaryHelper.uploadImage(data.image);
  }
  if (!talk || talk.isDeleted) {
    throw new ApiError(404, "Talk not found");
  }
  Object.assign(talk, { ...data, image });
  await talk.save();
  return talk;
};

const deleteTalk = async (id) => {
  const talk = await Talk.findById(id);
  if (!talk) {
    throw new ApiError(404, "Talk not found");
  }

  Object.assign(talk, { isDeleted: true });
  await talk.save();
  return talk;
};

module.exports = {
  createTalk,
  findOne,
  fetchAll,
  count,
  updateTalk,
  deleteTalk,
};
