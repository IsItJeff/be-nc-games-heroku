const db = require("../db/index.js");

exports.fetchCategories = () => {
    return db.query("SELECT * FROM categories;")
        .then(({ rows }) => {
            return rows;
        })
};