const db = require("../db/index.js");

exports.fetchComments = () => {
    return db.query("SELECT * FROM comments;")
        .then(({rows}) => {
            return rows;
        })
}