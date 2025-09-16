const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  sku: {
    type: String,
    unique: true,
    required: true,
  },
  stockQuantity: {
    type: Number,
    default: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", 
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  attributes: {
    weight: { type: String },
    size: { type: String },
    brand: { type: String },
  },
  images: {
    type: [String], 
    required: true,
    validate: {
      validator: function (arr) {
        return arr.length > 0;  
      },
      message: "A product must have at least one image.",
    },
  },
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
