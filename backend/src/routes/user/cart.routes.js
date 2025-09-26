const express = require("express");
const userAuth = require("../../middleware/userAuth");
const router = express.Router();
const cartController = require("../../controllers/user/cart.controller");

// User Cart routes
router.get("/", userAuth, cartController.getCart);
router.post("/cart", userAuth, cartController.addToCart);
// router.put("/cart", userAuth, cartController.updateCartItem);
// router.delete("/cart/:itemId", userAuth, cartController.removeCartItem);
// router.delete("/cart", userAuth, cartController.clearCart);

module.exports = router;