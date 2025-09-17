const mongoose = require("mongoose");
const generateId = require("../../utils/generateId");
const { trim } = require("validator");

const productSchema = mongoose.Schema({
  productId: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100,
    unique: true,
  },
  description: {
    type: String,
    default: "",
    trim: true,
    minlength: 10,
    maxlength: 500,
    
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
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  stockQuantity: {
    type: Number,
    default: 0,
    required: true,

  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", 
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
    required: true,
    
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

productSchema.pre('save', function(next) {
   if (!this.productId) {
    this.productId = generateId('PROD');
  }
  next();
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
