const categoriesRouter = require("express").Router();
const { getCategories } = require("../controllers/getCategories.controller.js");

categoriesRouter
    .route("/")
    .get(getCategories)

module.exports = categoriesRouter;