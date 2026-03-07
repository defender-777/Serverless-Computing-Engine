const mongoose = require("mongoose");

const ExecutionSchema = new mongoose.Schema({

  functionName: {
    type: String,
    required: true
  },

  status: {
    type: String,
    required: true
  },

  executionTime: {
    type: Number
  },

  output: {
    type: Object
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Execution", ExecutionSchema);