const { TOOLS_TABLE, dynamoDb, GetCommand, PutCommand } = require('../utils/providers');
const { sendResponse } = require('../utils/sendResponse');

module.exports.update = async (req) => {
    const { title, link, description, tags } = JSON.parse(req.body);
    const { toolId } = req.pathParameters;

    if (!title || !link || !description || !tags) {
        return sendResponse(400, { message: "Missing required fields" });
    }

    const params = {
        TableName: TOOLS_TABLE,
        Key: {
            toolID: toolId,
        },
        Item: {
            toolID: toolId,
            title: title,
            link: link,
            description: description,
            tags: tags
        }
    };

    try {
        const foundItem = await dynamoDb.send(new GetCommand(params));
        const existingTags = Array.isArray(foundItem.Item.tags) ? foundItem.Item.tags : [];

        if (typeof title !== 'undefined') {
            params.Item.title = title;
        }

        if (typeof link !== 'undefined') {
            params.Item.link = link;
        }

        if (typeof description !== 'undefined') {
            params.Item.description = description;
        }

        if (Array.isArray(tags)) {
            params.Item.tags = tags;
        } else if (typeof tags === 'string') {
            existingTags.push(tags);
            params.Item.tags = existingTags;
        }

        await dynamoDb.send(new PutCommand(params));

        return sendResponse(200, { message: "Successfully updated!" });
    } catch (error) {
        return sendResponse(500, { message: error.message });
    }
};


