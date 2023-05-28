const { TOOLS_TABLE, dynamoDb, GetCommand } = require('../utils/providers');
const { sendResponse } = require('../utils/sendResponse');

module.exports.get = async (req) => {
    const params = {
        TableName: TOOLS_TABLE,
        Key: {
            toolID: req.pathParameters.toolId
        },
    };

    try {
        const { Item } = await dynamoDb.send(new GetCommand(params));
        if (Item) {

            const response = {
                id: Item.toolID,
                title: Item.title,
                link: Item.link,
                description: Item.description,
                tags: Item.tags
            };
            return sendResponse(200, response);
        } else {
            return sendResponse(404, { message: "Tool not found!" });
        }
    } catch (error) {
        return sendResponse(500, { message: error.message });
    }
};





