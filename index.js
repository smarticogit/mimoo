const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  ScanCommand
} = require("@aws-sdk/lib-dynamodb");
const express = require("express");
const serverless = require("serverless-http");
const uuid = require('uuid');

const app = express();

const TOOLS_TABLE = process.env.TOOLS_TABLE;
const client = new DynamoDBClient();
const dynamoDbClient = DynamoDBDocumentClient.from(client);
const dynamodb2 = new DynamoDBClient()

app.use(express.json());

app.get("/tools", async (req, res) => {

  const params = {
    TableName: TOOLS_TABLE,
  };
  try {
    const results = await dynamoDbClient.send(new ScanCommand(params));;
    res.status(200).json(results.Items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/tools/:toolId", async function (req, res) {
  const params = {
    TableName: TOOLS_TABLE,
    Key: {
      toolID: req.params.toolId,
    },
  };

  try {
    const { Item } = await dynamoDbClient.send(new GetCommand(params));
    if (Item) {
      res.json(Item);
    } else {
      res.status(404).json({ error: "Tool não encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/tools", async function (req, res) {
  const { title, link, description, tags } = req.body;

  const params = {
    TableName: TOOLS_TABLE,
    Item: {
      toolID: uuid.v1(),
      title: title,
      link: link,
      description: description,
      tags: tags
    },
  };

  try {
    await dynamoDbClient.send(new PutCommand(params));
    res.json({ message: "Created with success!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});


module.exports.handler = serverless(app);
