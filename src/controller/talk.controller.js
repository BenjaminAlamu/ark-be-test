const catchAsync = require("../helpers/catchAsync");
const { talkService } = require("../services");
const ApiError = require("../helpers/ApiError");
const pick = require("../helpers/pick");

const createTalk = catchAsync(async function (req, res) {
  const talk = await talkService.createTalk(req.body);
  res.status(201).send({
    message: "Talk created successfully",
    data: {
      talk,
    },
  });
});

const edit = catchAsync(async function (req, res) {
  const talk = await talkService.updateTalk(req.params._id, req.body);

  res.status(200).send({
    message: "Talk updated successfully",
    data: {
      talk,
    },
  });
});

const list = catchAsync(async function (req, res) {
  //const filter = { isDeleted: false };

  const filter = { ...pick(req.query, ["category"]), isDeleted: false };
  const options = pick(req.query, ["sortBy", "limit", "page"]);

  const { talk, page } = await talkService.fetchAll(filter, options);
  const count = await talkService.count(filter);
  res.status(200).send({
    status: "success",
    message: "Talks Fetched successfully",
    data: {
      count,
      currentPage: page,
      talk,
    },
  });
});

const listOne = catchAsync(async function (req, res) {
  const talk = await talkService.findOne({
    slug: req.params.slug,
    isDeleted: false,
  });
  if (!talk) {
    throw new ApiError(404, "Talk not found");
  }
  res.status(200).send({
    status: "success",
    message: "Talk fetched Successfully",
    data: {
      talk,
    },
  });
});

const deleteTalk = catchAsync(async function (req, res) {
  const talk = await talkService.deleteTalk(req.params._id);

  res.status(200).send({
    message: "Item deleted successfully",
    data: {
      talks,
    },
  });
});

module.exports = {
  createTalk,
  edit,
  list,
  deleteTalk,
  listOne
};
