const e = require("express");
const Admin = require("../models/adminAndAnalytics/admin.model");
const jwt = require("jsonwebtoken");
const { ApiError } = require("../utils/apiError");

const adminAuth = async (req, res, next) => {
    const AdminToken = req.cookies.AdminToken;
    if (!AdminToken) {
        return next(new ApiError(401, "Unauthorized"));
    }
    try {
        const decoded = jwt.verify(AdminToken, process.env.JWT_SECRET);
        if (!decoded || !decoded._id) {
           throw new ApiError(401, "Invalid token");
        }
       const admin =  await Admin.findById(decoded._id);
       if(!admin || admin.role !== "admin"){
           throw new ApiError(401, "Unauthorized");
       }
         req.admin = admin;

       
        next();
    } catch (error) {
        next(error);
    } 
}
module.exports = adminAuth;