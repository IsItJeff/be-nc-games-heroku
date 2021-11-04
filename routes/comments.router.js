const commentsRouter = require("express").Router();
const { getComments } = require("../controllers/getComments.controller.js");

commentsRouter
    .route("/")
    .get(getComments);

module.exports = commentsRouter;