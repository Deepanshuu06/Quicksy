const jwt = require("jsonwebtoken");
const User = require("../models/userAndAccess/user.model");
const { ApiError } = require("../utils/apiError");
const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies;
    if (!token) {
      throw new ApiError(401, "Unauthorized");
    }
    const decodeObj = jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decodeObj;
    if (!_id) {
      throw new ApiError(401, "Unauthorized");
    }
    const user = await User.findById(_id);
    if (!user) {
      throw new ApiError(401, "Unauthorized");
    }
    req.user = user;
    next();
  } catch (error) {
    next(new ApiError(401, "Unauthorized"));
  }
};
module.exports = userAuth;
