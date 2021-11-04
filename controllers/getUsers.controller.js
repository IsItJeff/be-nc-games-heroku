const { fetchUsers, fetchUser } = require("../models/fetchUsers.model.js");

exports.getUsers = (req, res, next) => {
    fetchUsers()
        .then((users) => {
            res.status(200).send({ users });
        }).catch((err) => {
            next(err);
        })
}

exports.getUser = (req, res, next) => {
    const username = req.params.username;

    fetchUser(username)
        .then((user) => {
            res.status(200).send({ user });
        }).catch((err) => {
            next(err);
        })
}