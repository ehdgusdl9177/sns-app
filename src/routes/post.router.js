const { request } = require("express");
const express = require("express");
const multer = require("multer");
const { checkAuthenticated } = require("../middleware/auth");
const Comment = requrie("../models/comments.model");
const Post = require("../models/posts.model");
const router = express.Router();

const storageEngine = multer.diskStorage({
  description: (req, file, callback) => {
    callback(null, path.join(__dirname, "../public/assets/images"));
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storageEngine }).single("image");

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
