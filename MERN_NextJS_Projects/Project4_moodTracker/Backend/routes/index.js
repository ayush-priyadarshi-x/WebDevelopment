const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "The server was connected successfully. " });
});

module.exports = router;
