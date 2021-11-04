const apiRouter = require("express").Router();
const usersRouter = require("./users.router");
const reviewsRouter = require("./reviews.router");
const commentsRouter = require("./comments.router");
const categoriesRouter = require("./categories.router");

apiRouter
    .route("/")
    .get((req, res) => {
        res.status(200).send({ msg: "API Connection Successful, Welcome Back Commander" })
    })

apiRouter.use("/users", usersRouter);
apiRouter.use("/reviews", reviewsRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.use("/categories", categoriesRouter);

module.exports = apiRouter;