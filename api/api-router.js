const express = require("express");

const postsRouter = require("../posts/posts-router.js");

const router = express.Router();



router.use("/", postsRouter);

module.exports = router;