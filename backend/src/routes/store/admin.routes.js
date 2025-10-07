const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/store/admin.controller");
const adminAuth = require("../../middleware/adminAuth");

// Admin Auth Routes
router.post("/login", adminController.loginAdmin);
router.post("/logout", adminController.logoutAdmin);
router.get("/me", adminAuth, adminController.getAdminProfile);
// Admin Routes

// category routes
router.post('/category',adminAuth, adminController.createCategory);
router.get('/category',adminAuth, adminController.getCategories);
router.get('/category/:id',adminAuth, adminController.getCategoryById);
router.put('/category/:id',adminAuth, adminController.updateCategory);
// router.delete('/category/:id', adminController.deleteCategory);



// product routes
router.post('/product', adminAuth, adminController.createProduct);
router.get('/product',adminAuth, adminController.getProducts);
router.get('/product/:id', adminController.getProductById);
router.put('/product/:id', adminAuth, adminController.updateProduct);
router.delete('/product/:id', adminAuth, adminController.deleteProduct);

//inventory routes
router.get('/inventory', adminAuth, adminController.getInventory);
router.post('/inventory', adminAuth, adminController.addInventory);
// router.put('/inventory/:id', adminAuth, adminController.updateInventory);
// router.delete('/inventory/:id', adminAuth, adminController.deleteInventory);



// order routes
router.get('/orders',adminAuth, adminController.getAllOrders);
router.get('/order/:id', adminAuth, adminController.getOrderById);
router.put('/orders/:id/status', adminController.updateOrderStatus);
// router.delete('/orders/:id', adminController.deleteOrder);



//Banner routes
router.post('/banner', adminAuth, adminController.createBanner);
router.get('/banner', adminAuth, adminController.getBanners);
// router.put('/banner/:id', adminAuth, adminController.updateBanner);
// router.delete('/banner/:id', adminAuth, adminController.deleteBanner);



module.exports = router;