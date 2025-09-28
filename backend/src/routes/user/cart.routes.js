const express = require("express");
const userAuth = require("../../middleware/userAuth");
const router = express.Router();
const cartController = require("../../controllers/user/cart.controller");

// User Cart routes
router.get("/", userAuth, cartController.getCart);
router.post("/", userAuth, cartController.addToCart);
router.delete("/:itemId", userAuth, cartController.removeCartItem);
router.patch("/:itemId/increment", userAuth, cartController.incrementCartItem);
router.patch("/:itemId/decrement", userAuth, cartController.decrementCartItem);
router.delete("/", userAuth, cartController.clearCart);

module.exports = router;