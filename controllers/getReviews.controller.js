const { fetchReviews, fetchReview } = require("../models/fetchReviews.model.js");

exports.getReviews = (req, res, next) => {
    fetchReviews()
        .then((reviews) => {
            res.status(200).send({ reviews })
        }).catch((err) => {
            next(err)
        })
}

exports.getReview = (req, res, next) => {
    const reviewId = req.params.reviewId;
    fetchReview(reviewId)
        .then((review) => {
            res.status(200).send({ review })
        }).catch((err) => {
            next(err)
        })
}