const express = require("express");
const cors = require("cors");

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
//add new post
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
//update post
router.put("/posts/:id", (req, res) => {
    const changes = req.body;
    Posts.update(req.params.id, changes)
        .then(post => {
            if(post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: "The post could not be found"});
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error updating the post"
            });
        });
});
// remove post
router.delete("/posts/:id", (req, res) => {
    Posts.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: "The post has been deleted" });
            } else {
                res.status(404).json({ message: "The post could not be found" });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error removing the post"
            });
        });
});


// comments methods below
//foreign key = = post_id for comments table
//get comments for post
router.get("/posts/:id/comments", (req, res) => {
    const { id } = req.params;

    Posts.findPostComments(id)
        .then(comments => {
            res.status(200).json(comments);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ errorMessage: "Sorry no comment"})
        });
});

//insert comments
router.post("/posts/:id/comments", (req, res) => {
    const { id } = req.params;

    const comment = { ...req.body, post_id: id };

    Posts.insertComment(comment)
        .then(inserted => {
            res.status(200).json(inserted);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ errorMessage: "sorry, no comments for you" });
        });
});

module.exports = router; 

