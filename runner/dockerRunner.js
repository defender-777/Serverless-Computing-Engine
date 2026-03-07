const { exec } = require("child_process");
const path = require("path");

const runFunctionInDocker = (functionName, event) => {

  return new Promise((resolve, reject) => {

    const functionDir = path.join(
      __dirname,
      "..",
      "user-functions",
      functionName
    );

    const eventString = JSON.stringify(event).replace(/"/g, '\\"');

    const command = `docker run --rm -v "${functionDir}:/app" node:18 node /app/index.js "${eventString}"`;

    exec(command, (error, stdout, stderr) => {

      if (error) {
        return reject(stderr || error.message);
      }

      resolve(stdout.trim());

    });

  });

};

module.exports = { runFunctionInDocker };