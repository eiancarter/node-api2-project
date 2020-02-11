const express = require("express");

const Posts = require("./posts-model");

const router = express.Router();


router.get("/", (req, res) => {
    const pagination = req.query;

    console.log("pagination", pagination);

    Posts.find(pagination)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error retrieving the posts",
            });
        });
});