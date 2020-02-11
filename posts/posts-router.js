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
                res.status(200).json(hub);
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

router.post("/posts/:id/comments", (req, res) => {
    //add comments
})

