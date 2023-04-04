const express = require("express");
const listAllRoutes = require("express-list-endpoints");
const Table = require("cli-table");
const app = express();
const server = require("http").createServer(app);
const chatService = require("./services/chat.service");

require("dotenv").config();
const port = process.env.PORT;
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const { errorConverter, errorHandler } = require("./helpers/error");
const UPLOAD_PATH = path.join("./public/uploads");
app.use(cors(""));

require("./config/mongoose");
const logger = require("./config/logger");

var jsonParser = bodyParser.json({
  limit: 1024 * 1024 * 20,
  type: "application/json",
});
var urlencodedParser = bodyParser.urlencoded({
  extended: true,
  limit: 1024 * 1024 * 20,
  type: "application/x-www-form-urlencoded",
});

app.use(jsonParser);
app.use(urlencodedParser);
app.use("/api/v1", require("./routes/index"));
// app.use(express.static(UPLOAD_PATH));
app.use(errorConverter);
app.use(errorHandler);

let routesList = listAllRoutes(app);
routesList = routesList.map((route) => {
  const obj = {};
  obj[route.path] = route.methods.join(" | ");
  return obj;
});
const table = new Table();
table.push({ Endpoints: "Methods" }, ...routesList);
logger.info(table.toString());

const io = require("socket.io")(server, {
  cors: {
    origin: [process.env.FRONTEND_APP_URL],
  },
});

io.on("connection", async (client) => {
  client.on("send-message", async (data) => {
    await chatService.createChat({ ...data });
    client.broadcast.emit("new-chat", data);
  });
});

const appServer = server.listen(port, () => {
  console.log(`Node Starter Project starts at port ${port}`);
});
