const User = require("../../models/userAndAccess/user.model");
const { ApiError } = require("../../utils/apiError");
const { ApiResponse } = require("../../utils/ApiResponse");

exports.getProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const response = new ApiResponse(200, "Profile fetched successfully", user);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
exports.updateProfile = async (req,res,next)=>{
  try {
    const userId = req.user._id;
    const { name, email, address } = req.body;
    const user = await User.findByIdAndUpdate(userId, { name, email, address }, { new: true });
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const response = new ApiResponse(200, "Profile updated successfully", user);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}
exports.addAddress = async (req,res,next)=>{
  try {
    const user = req.user
    
  } catch (error) {
    next(error)
  }
}