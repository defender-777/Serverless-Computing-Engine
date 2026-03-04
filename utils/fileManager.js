const fs = require("fs");
const path = require("path");

const saveFunctionCode = (functionName, code) => {

  const functionDir = path.join(__dirname, "..", "user-functions", functionName);

  // Create directory if it does not exist
  if (!fs.existsSync(functionDir)) {
    fs.mkdirSync(functionDir, { recursive: true });
  }

  const filePath = path.join(functionDir, "index.js");

  fs.writeFileSync(filePath, code);

  return filePath;
};

module.exports = { saveFunctionCode };