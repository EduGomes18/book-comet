const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.status(200).send({
    message: "Welcome to Book Comet api!",
  });
});

module.exports = router;
