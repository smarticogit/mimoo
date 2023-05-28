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
            return sendResponse(200, { message: "Successfully deleted!" });
        } else {
            return sendResponse(404, { message: "Tool not found!" });
        }
    } catch (error) {
        return sendResponse(500, { message: error.message });
    }
};