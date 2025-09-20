const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/store/admin.controller");

// Admin Auth Routes
router.post("/login", adminController.loginAdmin);
router.post("/logout", adminController.logoutAdmin);
// Admin Routes

// category routes
router.post('/category', adminController.createCategory);
router.get('/category', adminController.getCategories);
router.get('/category/:id', adminController.getCategoryById);
router.put('/category/:id', adminController.updateCategory);
// router.delete('/category/:id', adminController.deleteCategory);



// product routes
router.post('/product', adminController.createProduct);
router.get('/product', adminController.getProducts);
// router.get('/product/:id', adminController.getProductById);
// router.put('/product/:id', adminController.updateProduct);
// router.delete('/product/:id', adminController.deleteProduct);
// // order routes
// router.get('/orders', adminController.getAllOrders);
// router.get('/orders/:id', adminController.getOrderById);
// router.put('/orders/:id/status', adminController.updateOrderStatus);
// router.delete('/orders/:id', adminController.deleteOrder);




module.exports = router;