
exports.action = new Array();
exports.action.insert = "INSERT";
exports.ROLE_ID = { employee: 2, admin: 1 };
exports.TOKEN_ERROR_MESSAGE = {
    PROVIDE_TOKEN: 'Please provide token',
    UNAUTHORIZED: 'Unauthorized token'
}
exports.ERROR_MESSAGES = {
    INTERNAL_SERVER_ERROR: 'Internal server error',
    USER_NOT_FOUND: 'User not found',
    EMAIL_REQUIRED: 'Email is required',
    USER_ALREADY_EXIST: 'User with email [0] already exist. Choose another email',
    IN_VALID_LOGIN: 'Invalid email or password'
}
