const mongoose = require("mongoose");

const FunctionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  runtime: {
    type: String,
    default: "node"
  },
  memoryLimit: {
    type: Number,
    default: 128
  },
  timeout: {
    type: Number,
    default: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Function", FunctionSchema);