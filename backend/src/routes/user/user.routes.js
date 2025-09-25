const express = require("express");
const userAuth = require("../../middleware/userAuth");
const router = express.Router();
const profileController = require("../../controllers/user/profile.controller");

//User Profile & Address routes
router.get("/profile", userAuth, profileController.getProfile);
router.put("/profile", userAuth, profileController.updateProfile);




// User Cart & Wishlist routes

//User Orders routes

//User Payments routes 
module.exports = router;