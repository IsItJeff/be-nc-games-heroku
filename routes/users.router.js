const usersRouter = require("express").Router();
const { getUsers, getUser } = require("../controllers/getUsers.controller.js");

usersRouter
    .route("/")
    .get(getUsers)

usersRouter
    .route("/:username")
    .get(getUser)


module.exports = usersRouter;