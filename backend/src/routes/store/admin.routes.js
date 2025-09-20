const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/store/admin.controller");

// Admin Auth Routes
router.post("/login", adminController.loginAdmin);
router.post("/logout", adminController.logoutAdmin);



module.exports = router;