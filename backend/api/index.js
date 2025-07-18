const app = require("./nodemon server");
const serverless = require("serverless-http");

module.exports.handler = serverless(app);
