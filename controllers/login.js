const { sendResponse } = require("../utils/sendResponse");
const formatUserAttributes = require("../utils/formatUserAttributes");
const { cognito } = require("../utils/providers");
const USER_POOL = process.env.USER_POOL;
const USER_POOL_CLIENT = process.env.USER_POOL_CLIENT;

module.exports.login = async (event) => {
    try {
        const { email, password } = JSON.parse(event.body);

        if (!email || !password) {
            return sendResponse(400, { message: "Missing required fields" });
        }

        const response = await cognito
            .adminInitiateAuth({
                AuthFlow: "ADMIN_NO_SRP_AUTH",
                UserPoolId: USER_POOL,
                ClientId: USER_POOL_CLIENT,
                AuthParameters: {
                    USERNAME: email,
                    PASSWORD: password,
                },
            })
            .promise();

        if (!response) {
            return sendResponse(404, { message: "User not found!" });
        }

        const data = await cognito
            .getUser({
                AccessToken: response.AuthenticationResult.AccessToken,
            })
            .promise();

        return sendResponse(200, {
            ...formatUserAttributes(data.UserAttributes),
            ...response.AuthenticationResult,
            statusCode: 200,
        });
    } catch (error) {
        return sendResponse(500, { message: error.message });
    }
};