const { cognito } = require("../utils/providers");
const USER_POOL = process.env.USER_POOL;
const sendResponse = require("../utils/sendResponse");

module.exports.register = async (event) => {
    try {
        const { email, password } = JSON.parse(event.body);

        const result = await cognito
            .adminCreateUser({
                UserPoolId: USER_POOL,
                Username: email,
                UserAttributes: [
                    {
                        Name: "email",
                        Value: email,
                    },
                    {
                        Name: "email_verified",
                        Value: "true",
                    },
                ],
                MessageAction: "SUPPRESS",
            })
            .promise();

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

        return sendResponse(200, { result });
    } catch (error) {
        console.error(error);
        return sendResponse(400, error);
    }
};