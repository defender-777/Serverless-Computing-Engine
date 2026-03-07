// Receive event payload from command line
const event = JSON.parse(process.argv[2]);

// User function handler
exports.handler = async (event) => {
  return {
    message: "Hello " + event.name
  };
};

// Execute handler and print result
(async () => {
  const result = await exports.handler(event);
  console.log(JSON.stringify(result));
})();