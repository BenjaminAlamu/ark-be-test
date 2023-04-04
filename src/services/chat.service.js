/* eslint-disable prettier/prettier */
const { Chat, User } = require("../models");
const ApiError = require("../helpers/ApiError");

const createChat = async (data) => {
  try {
    const { message, talk, email } = data;
    let user = await User.findOne({ email });
    const chat = await Chat.create({
      message,
      talk,
      user,
    });
    return JSON.parse(JSON.stringify(chat));
  } catch (error) {
    throw new ApiError(
      error.code || error.statusCode || 500,
      error.message || error
    );
  }
};

const findOne = async (criteria) => {
  try {
    const chat = await Chat.findOne({ ...criteria });
    if (!chat) {
      throw new ApiError(404, "Chat not found");
    }
    return JSON.parse(JSON.stringify(chat));
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

  let chat = await Chat.find(criteria)
    .sort(sort)
    .limit(_limit)
    .skip(_limit * (_page - 1));

  return { chat, page: _page };
};

const count = async (criteria = {}) => {
  return await Chat.find(criteria).countDocuments();
};

const updateChat = async (chatId, data) => {
  let chat = await Chat.findById(chatId);
  if (!chat) {
    throw new ApiError(404, "Chat not found");
  }
  Object.assign(chat, data);
  await chat.save();
  return chat;
};

const deleteChat = async (id) => {
  const chat = await Chat.findById(id);
  if (!chat) {
    throw new ApiError(404, "Chat not found");
  }

  Object.assign(chat, { isDeleted: true });
  await chat.save();
  return chat;
};

module.exports = {
  createChat,
  findOne,
  fetchAll,
  count,
  updateChat,
  deleteChat,
};
