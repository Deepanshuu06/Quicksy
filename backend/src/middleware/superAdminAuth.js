const Admin = require("../models/adminAndAnalytics/admin.model");
const { ApiError } = require("../utils/apiError");
const jwt = require("jsonwebtoken");

const superAdminAuth = async (req, res, next) => {
  try {
    // Assuming your token cookie name is 'token'
    const superAdminToken = req.cookies.superAdminToken;

    if (!superAdminToken) {
      throw new ApiError(401, "Unauthorized");
    }

    const decodeObj = jwt.verify(superAdminToken, process.env.JWT_SECRET);
    const { _id } = decodeObj;

    if (!_id) {
      throw new ApiError(401, "Unauthorized");
    }

    const superadmin = await Admin.findById(_id);

    if (!superadmin) {
      throw new ApiError(401, "Unauthorized");
    }

    console.log(superadmin);
    
    if (superadmin.role !== "superadmin") {
      throw new ApiError(401, "Unauthorized");
    }

    req.superadmin = superadmin;


    next();
  } catch (error) {
    next(new ApiError(401, "Unauthorized"));
  }
};

module.exports = superAdminAuth;
