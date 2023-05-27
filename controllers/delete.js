const { TOOLS_TABLE, dynamoDb, DeleteCommand } = require('../utils/providers');
const { sendResponse } = require('../utils/sendResponse');

module.exports.delete = async (req) => {
    const params = {
        TableName: TOOLS_TABLE,
        Key: {
            toolID: req.pathParameters.toolId
        },
    };

    try {
        const result = await dynamoDb.send(new DeleteCommand(params));
        if (result.$metadata.httpStatusCode === 200) {
            return sendResponse(200, { message: "successfully deleted" });
        } else {
            return sesendResponsend(200, { message: "Tool not found!" });
        }

    } catch (error) {
        return sendResponse(400, { message: error.message });
    }
};