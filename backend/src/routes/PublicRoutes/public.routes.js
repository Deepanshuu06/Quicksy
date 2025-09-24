const express = require("express");
const router = express.Router();
const publicController = require("../../controllers/publicAccessApi/public.controller");

// Public Routes
router.get("/categories", publicController.getCategories);
router.get("/products", publicController.getProductsByCategory);
router.get("/search", publicController.searchProducts);
router.get("/product/:id", publicController.getProductById);

module.exports = router;
