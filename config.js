const AWS = require("aws-sdk");

AWS.config.update({
  region: "ap-southeast-1",
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();

module.exports = { dynamoClient };
