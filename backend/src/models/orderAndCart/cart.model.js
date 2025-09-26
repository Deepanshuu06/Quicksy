const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({


      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
        max: 20,
      }


}, { timestamps: true });

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
