const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand, ScanCommand, GetCommand, DeleteCommand } = require("@aws-sdk/lib-dynamodb");
const { v1: uuid } = require('uuid');
const AWS = require("aws-sdk");
const cognito = new AWS.CognitoIdentityServiceProvider();
const TOOLS_TABLE = process.env.TOOLS_TABLE;
const client = new DynamoDBClient();
const dynamoDb = DynamoDBDocumentClient.from(client);

module.exports = {
    TOOLS_TABLE,
    uuid,
    dynamoDb,
    cognito,
    PutCommand,
    GetCommand,
    DeleteCommand,
    ScanCommand,
    DynamoDBDocumentClient
};