const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({

    store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
    required: [true, "Store ID is required"],
  },

    imageUrl: {
    type: String,
    required: [true, "Image URL is required"],
    validate: { 
      validator: function (v) {
        // Basic URL validation
        return /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(v);
      },
      message: props => `${props.value} is not a valid image URL`,
    },
  },
  link: {
    type: String,
    validate: { 
      validator: function (v) {
        // Basic URL validation
        return !v || /^https?:\/\/.+/.test(v);
      },
      message: props => `${props.value} is not a valid URL`,
    },
  },
  title: {
    type: String,
    maxlength: [100, "Title must be at most 100 characters"],
    trim: true,
  },
  description: {
    type: String,
    maxlength: [300, "Description must be at most 300 characters"],
    trim: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const Banner = mongoose.model("Banner", bannerSchema);
module.exports = Banner;