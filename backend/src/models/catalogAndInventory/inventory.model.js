const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    lowStockThreshold: {
      type: Number,
      default: 5,
      min: 0,
    },
    unit: {
      type: String,
      enum: ["pcs", "kg", "g", "l", "ml"],
      default: "pcs",
    },
    reserved: {
      type: Number,
      default: 0,
      min: 0,
    },
    sold: {
      type: Number,
      default: 0,
      min: 0,
    }
  },
  {
    timestamps: true,
  }
);


inventorySchema.index({ product: 1, store: 1 }, { unique: true });

const Inventory = mongoose.model("Inventory", inventorySchema);
module.exports = Inventory;
