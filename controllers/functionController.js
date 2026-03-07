const FunctionModel = require("../models/Function");
const Execution = require("../models/Execution");

const { saveFunctionCode } = require("../utils/fileManager");
const { runFunctionInDocker } = require("../runner/dockerRunner");


// ============================
// Upload Function
// ============================
const uploadFunction = async (req, res) => {

  try {

    const { name, runtime, code } = req.body;

    if (!name || !code) {
      return res.status(400).json({
        error: "Function name and code are required"
      });
    }

    const existingFunction = await FunctionModel.findOne({ name });

    if (existingFunction) {
      return res.status(400).json({
        error: "Function already exists"
      });
    }

    const newFunction = await FunctionModel.create({
      name,
      runtime: runtime || "node"
    });

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



// ============================
// Execute Function
// ============================
const executeFunction = async (req, res) => {

  const startTime = Date.now();

  try {

    const { functionName } = req.params;
    const event = req.body;

    const fn = await FunctionModel.findOne({ name: functionName });

    if (!fn) {
      return res.status(404).json({
        error: "Function not found"
      });
    }

    // Run inside Docker
    const output = await runFunctionInDocker(functionName, event);

    const parsedOutput = JSON.parse(output);

    const executionTime = Date.now() - startTime;

    // Store execution log
    await Execution.create({
      functionName,
      status: "success",
      executionTime,
      output: parsedOutput
    });

    res.json({
      result: parsedOutput,
      executionTime
    });

  } catch (error) {

    const executionTime = Date.now() - startTime;

    // Store failure log
    await Execution.create({
      functionName: req.params.functionName,
      status: "failed",
      executionTime,
      output: { error: error.message }
    });

    console.error("Execution Error:", error);

    res.status(500).json({
      error: "Function execution failed"
    });

  }

};



module.exports = {
  uploadFunction,
  executeFunction
};