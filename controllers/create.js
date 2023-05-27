const { TOOLS_TABLE, dynamoDb, PutCommand, uuid } = require('../utils/providers');
const { sendResponse } = require('../utils/sendResponse');

module.exports.create = async (req) => {
    const { title, link, description, tags } = JSON.parse(req.body);

    if (!title || !link || !description || !tags) {
        return sendResponse(400, { message: "Missing required fields" });
    }

    const params = {
        TableName: TOOLS_TABLE,
        Item: {
            toolID: uuid(),
            title: title,
            link: link,
            description: description,
            tags: tags
        },
    };

    try {
        await dynamoDb.send(new PutCommand(params));

        return sendResponse(200, { message: "successfully created!" });
    } catch (error) {
        return sendResponse(400, { message: error.message });
    }
};