const express = require("express");
const router = express.Router();
const publicController = require("../../controllers/publicAccessApi/public.controller");

// Public Routes
router.get("/categories", publicController.getCategories);


// router.get("/products?category=:categoryId", userSearchesController.getProductsByCategory);
// router.get("/products?search=:query", userSearchesController.searchProducts);
// router.get("/products/:id", userSearchesController.getProductById);

module.exports = router;
