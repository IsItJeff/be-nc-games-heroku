const { updateReview } = require("../models/updateReviews.model.js")

exports.patchReview = (req, res, next) => {
    const reviewId = req.params.reviewId;
    const reviewBody = req.body;

    updateReview(reviewId, reviewBody)
        .then((review) => {
            res.status(204).send({ review })
        }).catch((err) => {
            next(err);
        })
}