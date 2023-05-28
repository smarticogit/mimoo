const { TOOLS_TABLE, dynamoDb, ScanCommand } = require('../utils/providers');
const { sendResponse } = require('../utils/sendResponse');

module.exports.get = async (req) => {
    const { tag } = req.queryStringParameters;

    const params = {
        TableName: TOOLS_TABLE,
    };

    try {
        let response;

        if (tag) {
            const scanParams = {
                TableName: TOOLS_TABLE,
                FilterExpression: 'contains(tags, :tag)',
                ExpressionAttributeValues: {
                    ':tag': tag
                }
            };

            const { Items } = await dynamoDb.send(new ScanCommand(scanParams));

            if (Items && Items.length > 0) {
                response = Items.map((item) => ({
                    id: item.toolID,
                    title: item.title,
                    link: item.link,
                    description: item.description,
                    tags: item.tags
                }));
            } else {
                response = [];
            }
        } else {
            const { Items } = await dynamoDb.send(new ScanCommand(params));

            if (Items && Items.length > 0) {
                response = Items.map((item) => ({
                    id: item.toolID,
                    title: item.title,
                    link: item.link,
                    description: item.description,
                    tags: item.tags
                }));
            } else {
                response = [];
            }
        }

        return sendResponse(200, response);
    } catch (error) {
        return sendResponse(500, { message: error.message });
    }
};
