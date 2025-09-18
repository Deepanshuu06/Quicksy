const validator = require("validator");
const { ApiError } = require("./apiError");


const signupValidation = (req) => {
    const { name, phone, email, password } = req.body;

    const ALLOWED_FIELDS = ["name", "phone", "email", "password"];
    const isAllowed = Object.keys(req.body).every((k) => ALLOWED_FIELDS.includes(k));
    
    if (!isAllowed) {
        throw new ApiError(400, "Invalid fields in request body");
    }

    if (!name) {
        throw new ApiError(400, "Name is required");
    } else if (name.length < 3) {
        throw new ApiError(400, "Enter a valid name (min 3 characters)");
    }

    if (!phone) {
        throw new ApiError(400, "Phone number is required");
    } else if (!validator.isMobilePhone(phone)) {
        throw new ApiError(400, "Enter a valid phone number");
    }

    if (!email) {
        throw new ApiError(400, "Email is required");
    } else if (!validator.isEmail(email)) {
        throw new ApiError(400, "Enter a valid email address");
    }

    if (!password) {
        throw new ApiError(400, "Password is required");
    } else if (!validator.isStrongPassword(password)) {
        throw new ApiError(400, "Enter a strong password (e.g., min 8 characters, upper/lowercase, number, symbol)");
    }
};

module.exports = signupValidation;


