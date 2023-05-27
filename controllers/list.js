const { TOOLS_TABLE, dynamoDb, ScanCommand } = require('../utils/providers');
const { sendResponse } = require('../utils/sendResponse');

module.exports.list = async () => {

    const params = {
        TableName: TOOLS_TABLE
    }

    try {
        const results = await dynamoDb.send(new ScanCommand(params));

        const response = results.Items.map((item) => ({
            id: item.toolID,
            title: item.title,
            link: item.link,
            description: item.description,
            tags: item.tags
        }));

        return sendResponse(200, response);
    } catch (error) {
        return sendResponse(400, { message: error.message });
    }
};