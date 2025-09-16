const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category name is required"],
    unique: true,
    trim: true,
    minlength: [3, "Category name must be at least 3 characters"],
  },
  slug: {
    type: String,
    required: [true, "Slug is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  image: {
    type: String,
    default: null,
    validate: {
      validator: function (v) {
        // Basic URL validation
        return !v || /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(v);
      },
      message: props => `${props.value} is not a valid image URL`,
    },
  },
}, { timestamps: true });

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
