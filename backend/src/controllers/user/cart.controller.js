const Cart = require("../../models/orderAndCart/cart.model");
const { ApiError } = require("../../utils/apiError");
const { ApiResponse } = require("../../utils/ApiResponse");

exports.getCart = async (req, res, next) => {
  try {
    const user = req.user;
    await user.populate({ path: "cart", populate: { path: "product" } });
    const response = new ApiResponse(
      200,
      "Cart fetched successfully",
      user.cart
    );
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

exports.addToCart = async (req, res, next) => {
  try {
    const user = req.user;
    const { productId } = req.body;
    if (!productId) {
      throw new ApiError(400, "Product ID is required");
    }
    let existingCartItem = await Cart.findOne({
      _id: { $in: user.cart },
      product: productId,
    });
    if (existingCartItem) {
      if (existingCartItem.quantity >= 20) {
        throw new ApiError(
          400,
          "Cannot add more than 20 items of the same product"
        );
      }
      existingCartItem.quantity += 1;
      await existingCartItem.save();
    } else {
      const newCartItem = new Cart({
        product: productId,
        quantity: 1,
      });
      await newCartItem.save();
      user.cart.push(newCartItem._id);
      await user.save();
    }
    const response = new ApiResponse(200, "Product added to cart", null);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

exports.removeCartItem = async (req, res, next) => {
  try {
    const user = req.user;
    const { itemId } = req.params;
    if (!itemId) {
      throw new ApiError(400, "Item ID is required");
    }
    const cartItem = await Cart.findById(itemId).populate({ path: "product" });

    if (!cartItem) {
      throw new ApiError(404, "Cart item not found");
    }
    if (!user.cart.includes(cartItem._id)) {
      throw new ApiError(403, "You are not authorized to remove this item");
    }
    user.cart = user.cart.filter((id) => id.toString() !== itemId);
    await user.save();
    await Cart.findByIdAndDelete(itemId);
    const response = new ApiResponse(200, "Item removed from cart", null);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

exports.incrementCartItem = async (req, res, next) => {
  try {
    const user = req.user;
    const { itemId } = req.params;
    if (!itemId) {
      throw new ApiError(400, "Item ID is required");
    }
    const cartItem = await Cart.findById(itemId).populate({ path: "product" });
    if (!cartItem) {
      throw new ApiError(404, "Cart Item not found");
    }
    if (!user.cart.includes(cartItem._id)) {
      throw new ApiError(403, "You are not authorized to modify this item");
    }
    if (cartItem.quantity >= 20) {
      throw new ApiError(
        400,
        "Cannot have more than 20 Items of the same product"
      );
    }
    cartItem.quantity += 1;
    await cartItem.save();
    const response = new ApiResponse(
      200,
      "Cart item quantity incremented",
      null
    );
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

exports.decrementCartItem = async (req,res, next)=>{
  try {
    const user = req.user;
    const {itemId} = req.params;
    if(!itemId){
      throw new ApiError(400, "Item ID is required");
    }
    const cartItem = await Cart.findById(itemId).populate({path:"product"});
    if(!cartItem){
      throw new ApiError(404, "Cart Item not found");
    }
    if(!user.cart.includes(cartItem._id)){
      throw new ApiError(403, "You are not authorized to modify this item");
    }
    if(cartItem.quantity <=1){
      throw new ApiError(400, "Quantity cannot be less than 1. To remove the item, use the remove endpoint.");
    }
    cartItem.quantity -=1;
    await cartItem.save();
    const response = new ApiResponse(200, "Cart item quantity decremented", null);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

exports.clearCart = async (req,res,next)=>{
  try{
const user = req.user;
await Cart.deleteMany({_id:{$in:user.cart}});
user.cart =[];
await user.save();
const response = new ApiResponse(200, "Cart cleared successfully", null);
res.status(200).json(response);
  }catch(error){
    next(error);
  }
}
