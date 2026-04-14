const { exec } = require("child_process");
const path = require("path");

const runFunctionInDocker = (functionName, event) => {

  return new Promise((resolve, reject) => {

    // Fix Windows path issue
    const functionDir = path.join(
      __dirname,
      "..",
      "user-functions",
      functionName
    ).replace(/\\/g, "/");

    // Escape JSON safely
    const eventString = JSON.stringify(event).replace(/"/g, '\\"');

    const command = `docker run --rm -v "${functionDir}:/app" node:18 node /app/index.js "${eventString}"`;

    console.log("Running Docker Command:");
    console.log(command);

    exec(command, (error, stdout, stderr) => {

      if (error) {
        console.error("Docker Execution Error:", stderr || error.message);
        return reject(new Error(stderr || error.message));
      }

      if (!stdout) {
        console.error("Empty Output. STDERR:", stderr);
        return reject(new Error("No output from container"));
      }

      resolve(stdout.trim());

    });

  });

};

module.exports = { runFunctionInDocker };