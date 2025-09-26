const express = require("express");
const userAuth = require("../../middleware/userAuth");
const router = express.Router();
const profileController = require("../../controllers/user/profile.controller");

//User Profile & Address routes
router.get("/profile", userAuth, profileController.getProfile);
router.put("/profile", userAuth, profileController.updateProfile);
router.post("/address", userAuth, profileController.addAddress);
router.get("/address", userAuth, profileController.getAllAddresses);
router.delete("/address/:addressId", userAuth, profileController.deleteAddress);

// User Cart & Wishlist routes

//User Orders routes

//User Payments routes 
module.exports = router;