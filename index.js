const express = require("express");
const serverless = require("serverless-http");
const { deleteTool, get, create, list, update } = require("./controllers/tools");

const app = express();

app.use(express.json());

app.get("/tools", list);
app.post("/tools", create);
app.get("/tools/:toolId", get);
app.put("/tools/:toolId", update);
app.delete("/tools/:toolId", deleteTool);

module.exports.handler = serverless(app);
