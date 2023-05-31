const { cognito } = require("../utils/providers");
const USER_POOL = process.env.USER_POOL;
const { sendResponse } = require("../utils/sendResponse");

module.exports.register = async (event) => {
    try {
        const { email, password, name } = JSON.parse(event.body);

        if (!email || !password || !name) {
            return sendResponse(400, { message: "Missing required fields" });
        }

        const result = await cognito
            .adminCreateUser({
                UserPoolId: USER_POOL,
                Username: email,
                UserAttributes: [
                    {
                        Name: "custom:name",
                        Value: name
                    },
                    {
                        Name: "email",
                        Value: email
                    },
                    {
                        Name: "email_verified",
                        Value: "true"
                    },
                ],
                MessageAction: "SUPPRESS",
            })
            .promise();

        console.log(`1:`);
        if (result.User) {
            await cognito
                .adminSetUserPassword({
                    Password: password,
                    UserPoolId: USER_POOL,
                    Username: email,
                    Permanent: true,
                })
                .promise();
        }

        return sendResponse(200, { message: `User ${result.User.Username} created successfull!` });
    } catch (error) {
        return sendResponse(500, { message: error.message });
    }
};