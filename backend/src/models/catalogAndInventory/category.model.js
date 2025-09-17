const mongoose = require("mongoose");
const generateId = require("../../utils/generateId");

const categorySchema = new mongoose.Schema({
  categoryId: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Category name is required"],
    unique: true,
    trim: true,
    minlength: [3, "Category name must be at least 3 characters"],
    maxlength: [50, "Category name must be at most 50 characters"],
  },
  slug: {
    type: String,
    required: [true, "Slug is required"],
    unique: true,
    lowercase: true,
    trim: true,
    minlength: [3, "Slug must be at least 3 characters"],
    maxlength: [50, "Slug must be at most 50 characters"],
    match: [/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug can only contain lowercase letters, numbers, and hyphens'],
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
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }],
}, { timestamps: true });

categorySchema.pre('save', function(next) {
   if (!this.categoryId) {
    this.categoryId = generateId('CAT');
  }
  next();
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
