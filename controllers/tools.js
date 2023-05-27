const {
    DynamoDBClient,
    PutCommand,
    ScanCommand,
    DeleteCommand,
    GetCommand,
    uuid
} = require("../utils/providers");

const TOOLS_TABLE = process.env.TOOLS_TABLE;

const create = async (req, res) => {
    const { title, link, description, tags } = req.body;

    const params = {
        TableName: TOOLS_TABLE,
        Item: {
            toolID: uuid.v1(),
            title: title,
            link: link,
            description: description,
            tags: tags
        },
    };

    try {
        await DynamoDBClient.send(new PutCommand(params));
        res.status(201).json({ message: "successfully created!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const list = async (req, res) => {
    try {
        const results = await DynamoDBClient.send(new ScanCommand({ TableName: TOOLS_TABLE }));;
        res.status(200).json(results.Items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const get = async (req, res) => {
    const params = {
        TableName: TOOLS_TABLE,
        Key: {
            toolID: req.params.toolId,
        },
    };

    try {
        const { Item } = await DynamoDBClient.send(new GetCommand(params));
        if (Item) {
            res.status(200).json(Item);
        } else {
            res.status(404).json({ message: "Tool not found!" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const update = async (req, res) => {
    const { title, link, description, tags } = req.body;
    const { toolId } = req.params;

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
    }

    try {
        const foundItem = await DynamoDBClient.send(new GetCommand(params));
        const getedTags = foundItem.Item.tags;

        params.Item.title = title ? title : params.Item.title;
        params.Item.link = link ? link : params.Item.link;
        params.Item.description = description ? description : params.Item.description

        if (tags) {
            if (typeof tags === 'string') {
                getedTags.push(tags);
            } else {
                params.Item.tags = tags;
            }
        }

        await DynamoDBClient.send(new PutCommand(params));
        res.status(201).json({ message: "successfully Updated!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteTool = async (req, res) => {
    const params = {
        TableName: TOOLS_TABLE,
        Key: {
            toolID: req.params.toolId,
        },
    };

    try {
        const result = await DynamoDBClient.send(new DeleteCommand(params));
        if (result.$metadata.httpStatusCode === 200) {
            res.status(200).json({ message: "successfully deleted" });
        } else {
            res.status(404).json({ message: "Tool not found!" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { create, deleteTool, get, list, update }

