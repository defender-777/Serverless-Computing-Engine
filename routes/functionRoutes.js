const express = require("express");
const router = express.Router();

const {
  uploadFunction,
  executeFunction
} = require("../controllers/functionController");

// Upload new function
router.post("/functions", uploadFunction);

// Execute stored function
router.post("/execute/:functionName", executeFunction);

module.exports = router;