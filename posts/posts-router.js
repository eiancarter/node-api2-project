const express = require("express");

const Posts = require("./posts-model");

const router = express.Router();

//get all posts
router.get("/posts", (req, res) => {
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

//get individual post
router.get("/posts/:id", (req, res) => {
    Posts.findById(req.params.id)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: "Post not found"});
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error retrieving the post"
            });
        });
});

router.post("/posts", (req, res) => {
    Posts.insert(req.body)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error add the post"
            });
        });
});

router.post("/posts/:id/comments", (req, res) => {
    //add comments
})