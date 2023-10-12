const express = require("express");
const { checkAuthenticated } = require("../middleware/auth");
const router = express.Router();

router.get("/", checkAuthenticated, (req, res) => {
  res.redirect("/posts");
});

module.exports = router;
