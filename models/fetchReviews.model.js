const db = require("../db/index.js");

exports.fetchReviews = () => {
    return db.query("SELECT * FROM reviews")
        .then(({ rows }) => {
            return rows;
        })
}

exports.fetchReview = (reviewId) => {
    return db.query("SELECT * FROM reviews WHERE review_id = $1", [reviewId])
        .then(({ rows }) => {
            return rows;
        })
}