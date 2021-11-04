const db = require("../db/index.js");

exports.fetchUsers = () => {
    return db.query("SELECT * FROM users;")
        .then(({ rows }) => {
            return rows;
        })
}

exports.fetchUser = (username) => {
    return db.query("SELECT * FROM users WHERE username = $1", [username])
        .then(({ rows }) => {
            return rows;
        })
}