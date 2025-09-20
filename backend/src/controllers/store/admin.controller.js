const Admin = require("../../models/adminAndAnalytics/admin.model");
const { ApiError } = require("../../utils/apiError");
const { ApiResponse } = require("../../utils/ApiResponse");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Admin Auth Controllers

exports.loginAdmin = async (req, res, next) => {
  try {
    const { email, store, password } = req.body;
    const ALLOWED_FIELDS = ["email", "store", "password"];
    const isFieldValid = Object.keys(req.body).every((k) =>
      ALLOWED_FIELDS.includes(k)
    );
    if (!isFieldValid) {
      throw new ApiError(400, "Invalid fields in request body");
    }
    if (!email || !store || !password) {
      throw new ApiError(400, "All Fields Required");
    }
    const admin = await Admin.findOne({
      $and: [{ email: email }, { store: store }, { role: "admin" }],
    });
    if (!admin) {
      throw new ApiError(404, "Admin not found");
    }

    
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid password");
    }
    const response = new ApiResponse(200, "Login successful", {
      adminId: admin._id,
      email: admin.email,
    });
    const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET);

    res.cookie("token", token);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

exports.logoutAdmin = async (req, res, next) => {
  try {
    res.clearCookie("AdminToken");
    const response = new ApiResponse(200, "Logout Successfull");
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
