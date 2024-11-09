// server.js
const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const { db } = require("./model/index"); 
const { errorHandler } = require("./middleware");
const app = express();
app.set(path.join(__dirname));
app.use(cors());
app.use(express.static(__dirname));
app.use(bodyParser.json({ limit: "100000mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", require("./router/index"));
app.use(errorHandler.methodNotAllowed);
app.use(errorHandler.genericErrorHandler);
const server = http.createServer(app);
server.listen(process.env.APP_PORT || 8092, () => {
  console.log(`Server running on port ${process.env.APP_HOST}:${process.env.APP_PORT || 8092}`);
});
process.on("unhandledRejection", (err) => {
  console.error("Possibly unhandled rejection happened");
  console.error(err.message);
});

const closeHandler = () => {
  server.close(() => {
    console.info("Server is stopped successfully");
    process.exit(0);
  });
};

process.on("SIGTERM", closeHandler);
process.on("SIGINT", closeHandler);
