const FunctionModel = require("../models/Function");
const { saveFunctionCode } = require("../utils/fileManager");

const uploadFunction = async (req, res) => {
  try {
    const { name, runtime, code } = req.body;

    // Validate request
    if (!name || !code) {
      return res.status(400).json({
        error: "Function name and code are required"
      });
    }

    // Check if function already exists
    const existingFunction = await FunctionModel.findOne({ name });

    if (existingFunction) {
      return res.status(400).json({
        error: "Function already exists"
      });
    }

    // Save function metadata to MongoDB
    const newFunction = await FunctionModel.create({
      name,
      runtime: runtime || "node"
    });

    // Save function code to filesystem
    saveFunctionCode(name, code);

    res.status(201).json({
      message: "Function uploaded successfully",
      function: newFunction
    });

  } catch (error) {
    console.error("Upload Function Error:", error);

    res.status(500).json({
      error: "Server error"
    });
  }
};

module.exports = {
  uploadFunction
};