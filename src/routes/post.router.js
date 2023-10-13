const { request } = require("express");
const express = require("express");
const { checkAuthenticated } = require("../middleware/auth");
const Post = require("../models/posts.model");
const router = express.Router();

router.get("/", checkAuthenticated, (req, res) => {
  Post.findOne()
    .populate("comment")
    .sort({ createdAt: -1 })
    .exec((err, posts) => {
      if (err) {
        console.log("Error occured");
      } else {
        res.render("posts/index", {
          posts: posts,
          currentUser: request.user,
        });
      }
    });
});

module.exports = router;
