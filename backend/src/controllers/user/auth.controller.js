const User = require("../../models/userAndAccess/user.model");
const { ApiError } = require("../../utils/apiError");
const { ApiResponse } = require("../../utils/ApiResponse");
const loginValidation = require("../../utils/loginValidation");
const signupValidation = require("../../utils/signupValidation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res , next) => {
  const { name, phone, email, password } = req.body;
  try {
   
    signupValidation(req);
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      throw new ApiError(400, "Email already in use");
    }
    const existingPhone = await User.findOne({ phone: phone });
    if (existingPhone) {
      throw new ApiError(400, "Phone number already in use");
    }
    const hashpassword = await bcrypt.hash(password, 10);

    const user = new User({ name, phone, email, password: hashpassword });
    await user.save();
    const response = new ApiResponse(200, "Registration Successful", user);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};


exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {

    loginValidation(req);
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new ApiError(401, "Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const response = new ApiResponse(200, "Login successful", {
        userId: user._id,
        name: user.name,
        email: user.email,
      });
      const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET)

      res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Must be false for localhost (no HTTPS)
      sameSite: "lax", // Works across localhost:5173 and localhost:7777
    });

      res.status(200).json(response);
    } else {
      throw new ApiError(401, "Invalid credentials");
    }
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res) => {};
