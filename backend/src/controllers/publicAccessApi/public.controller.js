const Banner = require("../../models/catalogAndInventory/banner.model");
const Category = require("../../models/catalogAndInventory/category.model");
const Product = require("../../models/catalogAndInventory/product.model");
const { ApiError } = require("../../utils/apiError");
const { ApiResponse } = require("../../utils/ApiResponse");


exports.getHomeData = async (req, res, next) => {
  try{
    const categories = await Category.find().populate({path:"products", match:{isActive:true} , options:{limit:20}});

    const categoryList = categories.map((category) => ({
      id: category._id,
      name: category.name,
      image: category.image,
      slug: category.slug,
      products: category.products || [],
    }));
    const banners = await Banner.find({store:"68cdde95b098bde863ed5d40"}).limit(3);
    const response = new ApiResponse(200, "Home data fetched successfully", {
      categories: categoryList,
      banners: banners
    });
    res.status(200).json(response);

  }catch(error){
    next(error)   
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    // find the products inside the category
    const categories = await Category.find().populate("products");

    const categoryList = categories.map((category) => ({
      id: category._id,
      name: category.name,
      image: category.image,
      slug: category.slug,
      products: category.products || [],
    }));

    const response = new ApiResponse(200, "Categories fetched successfully", {
      categories: categoryList,
    });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
exports.getProductsByCategory = async (req, res, next) => {
  try {
    const { categoryId , limit } = req.query;
    if (!categoryId) {
      throw new ApiError(400, "Category ID is required");
    }
    const category = await Category.findById(categoryId).populate("products");
    if (!category) {
      throw new ApiError(404, "Category not found");
    }
    if(limit){
      category.products = category.products.slice(0, parseInt(limit));
    }
    const products = category.products || [];
    const response = new ApiResponse(200, "Products fetched successfully", {
      products: products,
    });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

exports.searchProducts = async (req, res , next)=>{
    try {
        const {search} = req.query
        
        if (!search) {
            throw new ApiError(400, "Search query is required");
        }
        const products = await Product.find({$and:[{$or:[{name:{$regex:search,$options:"i"}},{description:{$regex:search,$options:"i"}}]},{isActive:true}]})


        const response = new ApiResponse(200, "Products fetched successfully", {
            products: products
        });
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}
exports.getProductById = async (req, res, next) => {
    try {
         const productId = req.params.id;
        if (!productId) {
            throw new ApiError(400, "Product ID is required");
        }
        const product = await Product.findById(productId);
        if (!product) {
            throw new ApiError(404, "Product not found");
        }
        const response = new ApiResponse(200, "Product fetched successfully", {
            product: product
        });
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

