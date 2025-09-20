const Admin = require("../../models/adminAndAnalytics/admin.model");
const { ApiError } = require("../../utils/apiError");
const { ApiResponse } = require("../../utils/ApiResponse");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.loginSuperAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const ALLOWED_FIELDS = ["email", "password"];
    const isFiledvalid = Object.keys(req.body).every((k) =>
      ALLOWED_FIELDS.includes(k)
    );
    if (!isFiledvalid) {
      throw new ApiError(400, "Invalid fields in request body");
    }
    if (!email || !password) {
      throw new ApiError(400, "All Fields Required");
    }
    const superAdmin = await Admin.findOne({ $and: [{ email: email }, { role: "superadmin" }] });
    if (!superAdmin) {
      throw new ApiError(404, "Super Admin not found");
    }
    const isPasswordValid = await bcrypt.compare(password, superAdmin.password);
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid password");
    }
    const response = new ApiResponse(200, "Login successful", {
      superAdminId: superAdmin._id,
      email: superAdmin.email,
    });
    const token = jwt.sign({ _id: superAdmin._id }, process.env.JWT_SECRET);

    res.cookie("superAdminToken", token);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

exports.logoutSuperAdmin = async (req, res, next) => {
  try {
    res.clearCookie("superAdminToken");
    const response = new ApiResponse(200, "Logout Successfull");
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
