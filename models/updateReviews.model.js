const db = require("../db/index.js");

exports.updateReview = (reviewId, reviewBody) => {
    const bodyArr = [];

    for (const [key, value] of Object.entries(reviewBody)) {
        bodyArr.push(`${key}='${value}'`)
    }

    console.log(`UPDATE reviews SET ${bodyArr} WHERE review_id = ${reviewId} RETURNING *;`)
    return db.query(`UPDATE reviews SET $1 WHERE review_id = $2 RETURNING *;`, [bodyArr, reviewId])
        .then(({ rows }) => {
            return rows;
        })
}