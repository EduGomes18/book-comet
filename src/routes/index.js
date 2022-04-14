const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.status(200).send({
    title: "Ewali test api",
  });
});

module.exports = router;
