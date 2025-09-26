const Address = require("../../models/userAndAccess/address.model");
const User = require("../../models/userAndAccess/user.model");
const { ApiError } = require("../../utils/apiError");
const { ApiResponse } = require("../../utils/ApiResponse");

exports.getProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate({path:"cart" , populate: { path: "product" }}).populate('favourites').populate('pastOrders').populate('addresses');
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
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(userId, { name, email }, { new: true });
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
    const user = req.user;
    // Restrict to max 3 addresses
    if (user.addresses.length >= 3) {
      throw new ApiError(400, "You can only add up to 3 addresses.");
    }
    const Allowed_Fields = ["street", "city", "state", "postalCode", "country" , "addressType"];
    const isFieldValid = Object.keys(req.body).every((k) => Allowed_Fields.includes(k));
    if (!isFieldValid) {
      throw new ApiError(400, "Invalid fields in request body");
    }
    const newAddress = new Address({
      ...req.body
    });
    await newAddress.save();
    user.addresses.push(newAddress._id);
    await user.save();
    const response = new ApiResponse(200, "Address added successfully", await user.populate('addresses'));
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}
exports.getAllAddresses = async(req,res,next)=>{
  try{
const user = req.user;
const populatedUser = await user.populate('addresses');
const response = new ApiResponse(200, "Addresses fetched successfully", populatedUser.addresses);
res.status(200).json(response);
  }catch(error){
    next(error)
  }
}
exports.deleteAddress = async (req , res, next)=>{
  try {
    const user = req.user;
    const {addressId} = req.params
    if(!addressId){
      throw new ApiError(400, "Address ID is required")
    }
    if(!user.addresses.includes(addressId)){
      throw new ApiError(404, "Address not found in your profile")
    }
    user.addresses = user.addresses.filter(addrId => addrId.toString() !== addressId)
    await user.save()
    await Address.findByIdAndDelete(addressId)
    const response = new ApiResponse(200, "Address deleted successfully", await user.populate('addresses'));
    res.status(200).json(response);
  } catch (error) {
    next(error)
  }
}
