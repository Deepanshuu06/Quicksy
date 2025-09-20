const express = require("express");
const router = express.Router();
const superAdminController = require("../../controllers/superAdmin/superAdmin.controller");
const superAdminAuthController = require("../../controllers/superAdmin/superAdminAuth.controller");
const superAdminAuth = require("../../middleware/superAdminAuth");
// Super Admin Auth Routes
router.post("/login", superAdminAuthController.loginSuperAdmin);
router.post("/logout", superAdminAuthController.logoutSuperAdmin);

// Super Admin Routes

router.post("/create-admin", superAdminAuth, superAdminController.createAdmin);

router.post("/create-store", superAdminController.createStore);
// router.get("/stores", superAdminController.getAllStores);
// router.get("/stores/:id", superAdminController.getStoreById);
// router.put("/stores/:id", superAdminController.updateStore);
// router.delete("/stores/:id", superAdminController.deleteStore);

// router.get("/admins", superAdminController.getAllAdmins);
// router.get("/admins/:id", superAdminController.getAdminById);
// router.put("/admins/:id", superAdminController.updateAdmin);
// router.delete("/admins/:id", superAdminController.deleteAdmin);

module.exports = router;