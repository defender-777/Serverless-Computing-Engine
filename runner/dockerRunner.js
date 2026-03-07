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

    // Escape JSON safely for shell execution
    const eventString = JSON.stringify(event).replace(/"/g, '\\"');

    const command = `
      docker run --rm \
      --memory=128m \
      --cpus=0.5 \
      --pids-limit=64 \
      -v "${functionDir}:/app" \
      node:18 \
      timeout 5 node /app/index.js "${eventString}"
    `;

    exec(command, (error, stdout, stderr) => {

      if (error) {

        // Exit code 124 = timeout
        if (error.code === 124) {
          return reject(new Error("Function execution timed out"));
        }

        return reject(new Error(stderr || error.message));
      }

      resolve(stdout.trim());

    });

  });

};

module.exports = { runFunctionInDocker };