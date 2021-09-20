const AWS = require("aws-sdk");
const express = require("express");
const serverless = require("serverless-http");

const app = express();

const USERS_TABLE = process.env.USERS_TABLE;

const dynamoDbClientParams = {};
// process.env.IS_OFFLINE is set by serverless-offline plugin
if (process.env.IS_OFFLINE) {
  dynamoDbClientParams.region = 'localhost'
  dynamoDbClientParams.endpoint = 'http://localhost:8000'
}
const dynamoDbClient = new AWS.DynamoDB.DocumentClient(dynamoDbClientParams);

app.use(express.json());

app.get("/users", async function (req, res) {
  const params = {
    TableName: USERS_TABLE
  };

  try {
    const { Items, Count, ScannedCount }= await dynamoDbClient.scan(params).promise();
    res.json({ Items, Count, ScannedCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retreive all users" });
  }
});

app.get("/users/:id", async function (req, res) {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      id: req.params.id,
    },
  };

  try {
    const { Items, Count, ScannedCount }= await dynamoDbClient.scan(params).promise();
    res.json({ Items, Count, ScannedCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retreive the user" });
  }
});

app.delete("/users/:id", async function (req, res) {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      id: req.params.id,
    },
  };

  try {
    await dynamoDbClient.delete(params).promise();
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not delete the user" });
  }
});

app.post("/users", async function (req, res) {
  const { id, firstName, lastName, email } = req.body;
  if (typeof id !== "string") {
    res.status(400).json({ error: '"id" must be a string' });
  } else if (typeof firstName !== "string") {
    res.status(400).json({ error: '"firstName" must be a string' });
  } else if (typeof lastName !== "string") {
    res.status(400).json({ error: '"lastName" must be a string' });
  } else if (typeof email !== "string") {
    res.status(400).json({ error: '"email" must be a string' });
  }

  const params = {
    TableName: USERS_TABLE,
    Item: { id, firstName, lastName, email },
  };

  try {
    await dynamoDbClient.put(params).promise();
    res.status(201).json({ id, firstName, lastName, email });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not create user" });
  }
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});


module.exports.handler = serverless(app);
module.exports.app = app;
