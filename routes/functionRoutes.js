const express = require("express");
const router = express.Router();

const { uploadFunction } = require("../controllers/functionController");

router.post("/functions", uploadFunction);

module.exports = router;