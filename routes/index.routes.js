const express = require("express");
const indexRouter = express.Router();
const { indexMovie } = require("../index");

indexRouter.post("/indexMovie", indexMovie);

module.exports = indexRouter;
