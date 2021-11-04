const reviewsRouter = require("express").Router();
const { getReviews, getReview } = require("../controllers/getReviews.controller.js");
const { patchReview } = require("../controllers/patchReviews.controller.js");

reviewsRouter
    .route("/")
    .get(getReviews);

reviewsRouter
    .route("/:reviewId")
    .get(getReview)
    .patch(patchReview)

module.exports = reviewsRouter;