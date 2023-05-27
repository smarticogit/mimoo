const { DynamoDBDocumentClient, PutCommand, ScanCommand, GetCommand, DeleteCommand } = require("@aws-sdk/lib-dynamodb");
const AWS = require("aws-sdk");
const uuid = require('uuid');
// const dynamoDbClient = DynamoDBDocumentClient.from(client);
const rekognition = new AWS.Rekognition();
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const cognito = new AWS.CognitoIdentityServiceProvider();

module.exports = {
    rekognition,
    dynamoDb,
    cognito,
    PutCommand,
    GetCommand,
    DeleteCommand,
    ScanCommand,
    DynamoDBDocumentClient
};