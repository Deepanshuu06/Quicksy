
const validator = require("validator");
const { ApiError } = require("./apiError");

const loginValidation = (req) => {
    const { email, password } = req.body;

    const ALLOWED_FIELDS = ["email", "password"];
    const isAllowed = Object.keys(req.body).every((k) => ALLOWED_FIELDS.includes(k));

    if (!isAllowed) {
        throw new ApiError(400, "Invalid fields in request body");
    }

    if (!email) {
        throw new ApiError(400, "Email is required");
    } else if (!validator.isEmail(email)) {
        throw new ApiError(400, "Enter a valid email address");
    }

    if (!password) {
        throw new ApiError(400, "Password is required");
    }
};

module.exports = loginValidation;