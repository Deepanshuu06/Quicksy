const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout )
router.post("/profile", authController.profile )
router.post("/verify-otp", authController.verifyOtp )

module.exports = router;
