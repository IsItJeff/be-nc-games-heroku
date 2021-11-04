const { fetchComments } = require("../models/fetchComments.model.js");

exports.getComments = (req, res, next) => {
    fetchComments()
        .then((comments) => {
            res.status(200).send({comments});
        }).catch((err) => {
            next(err);
    })
}