const Admin = require("../../models/adminAndAnalytics/admin.model");
const Category = require("../../models/catalogAndInventory/category.model");
const Product = require("../../models/catalogAndInventory/product.model");
const { ApiError } = require("../../utils/apiError");
const { ApiResponse } = require("../../utils/ApiResponse");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Admin Auth Controllers
exports.loginAdmin = async (req, res, next) => {
  try {
    const { email, store, password } = req.body;
    const ALLOWED_FIELDS = ["email", "store", "password"];
    const isFieldValid = Object.keys(req.body).every((k) =>
      ALLOWED_FIELDS.includes(k)
    );
    if (!isFieldValid) {
      throw new ApiError(400, "Invalid fields in request body");
    }
    if (!email || !store || !password) {
      throw new ApiError(400, "All Fields Required");
    }
    const admin = await Admin.findOne({
      $and: [{ email: email }, { store: store }, { role: "admin" }],
    });
    if (!admin) {
      throw new ApiError(404, "Admin not found");
    }

    
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid password");
    }
    const response = new ApiResponse(200, "Login successful", {
      adminId: admin._id,
      email: admin.email,
    });
    const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET);

    res.cookie("AdminToken", token);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

exports.logoutAdmin = async (req, res, next) => {
  try {
    res.clearCookie("AdminToken");
    const response = new ApiResponse(200, "Logout Successfull");
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

// Admin Controllers

// Category Controllers
exports.createCategory = async (req, res, next) => {
  try {
    const {name , slug , image} = req.body
    const ALLOWED_FIELDS = ["name" , "slug" , "image"]
    const isFieldsValid = Object.keys(req.body).every((k)=>ALLOWED_FIELDS.includes(k))
    if(!isFieldsValid){
      throw new ApiError(400 , "Invalid fields in request body")
    }
    if(!name || !slug || !image){
      throw new ApiError(400 , "All fields are required")
    }
    // Check if category with the same name or slug already exists
    const isCategoryExists = await Category.findOne({ $or: [{ name: name }, { slug: slug }] });
    if (isCategoryExists) {
      throw new ApiError(400, "Category with this name or slug already exists");
    }
    
    const newCategory = new Category({
      name,
      slug,
      image
    });
    await newCategory.save();
    const response = new ApiResponse(201, "Category created successfully", {
      categoryId: newCategory._id,
      name: newCategory.name,
      slug: newCategory.slug,
      image: newCategory.image
    });
    res.status(201).json(response);
    
  } catch (error) {
    next(error)
  }

}
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    const response = new ApiResponse(200, "Categories fetched successfully", {
      categories: categories
    });
    res.status(200).json(response);
  } catch (error) {
    next(error)
  }
}
exports.getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      throw new ApiError(404, "Category not found");
    }
    const response = new ApiResponse(200, "Category fetched successfully", {
      category: category
    });
    res.status(200).json(response);
  } catch (error) {
    next(error)
  }
}
exports.updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, slug, image } = req.body;
    const ALLOWED_FIELDS = ["name", "slug", "image"];
    const isFieldsValid = Object.keys(req.body).every((k) => ALLOWED_FIELDS.includes(k));
    if (!isFieldsValid) {
      throw new ApiError(400, "Invalid fields in request body");
    }
    if (!name && !slug && !image) {
      throw new ApiError(400, "At least one field is required to update");
    }
    const category = await Category.findById(id);
    if (!category) {
      throw new ApiError(404, "Category not found");
    }
    // Check if category with the same name or slug already exists
    if (name && name !== category.name) {
      const isNameExists = await Category.findOne({ name: name });
      if (isNameExists) {
        throw new ApiError(400, "Category with this name already exists");
      }
      category.name = name;
    }
    if (slug && slug !== category.slug) {
      const isSlugExists = await Category.findOne({ slug: slug });
      if (isSlugExists) {
        throw new ApiError(400, "Category with this slug already exists");
      }
      category.slug = slug;
    }
    if (image) {
      category.image = image;
    }
    await category.save();
    const response = new ApiResponse(200, "Category updated successfully", {
      category: category
    });
    res.status(200).json(response);
  } catch (error) {
    next(error)
  }
}
exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      throw new ApiError(404, "Category not found");
    }
    await Category.findByIdAndDelete(id);
    const response = new ApiResponse(200, "Category deleted successfully");
    res.status(200).json(response);
  }
  catch (error) {
    next(error)
  } 
}

// Product Controllers

exports.createProduct = async (req, res, next) => {
  const { name, description, price, sku, category, attributes, images } = req.body;
  const ALLOWED_FIELDS = ["name", "description", "price", "sku",, "category", "attributes", "images"];
  const isFieldsValid = Object.keys(req.body).every((k) => ALLOWED_FIELDS.includes(k));
  if (!isFieldsValid) {
    throw new ApiError(400, "Invalid fields in request body");
  }
  if (!name || !description || !price || !sku  || !category || !attributes || !images) {
    throw new ApiError(400, "All fields are required");
  }
  try {
    // Check if product with the same SKU already exists
    const isProductExists = await Product.findOne({ sku: sku });
    if (isProductExists) {
      throw new ApiError(400, "Product with this SKU already exists");
    }
    const newProduct = new Product({
      name,
      description,
      price,
      sku,
      category,
      attributes,
      images
    });
    await newProduct.save();
    const response = new ApiResponse(201, "Product created successfully", {
      productId: newProduct._id,
      name: newProduct.name,
      description: newProduct.description,
      price: newProduct.price,
      sku: newProduct.sku,
      category: newProduct.category,
      attributes: newProduct.attributes,
      images: newProduct.images
    });
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

exports.getProducts = async (req, res, next )=>{
try {

  const products = await Product.find().populate('category').populate('inventory');
  const response = new ApiResponse(200, "Products fetched successfully", {
    products: products
  });
  res.status(200).json(response);
} catch (error) {
  next(error)
}
  
}