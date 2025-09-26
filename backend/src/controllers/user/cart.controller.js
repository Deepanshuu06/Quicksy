
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
    let existingCartItem = await Cart.findOne({_id:{$in:user.cart},product:productId});
    if (existingCartItem) {
      if(existingCartItem.quantity>=20){
        throw new ApiError(400, "Cannot add more than 20 items of the same product");
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
