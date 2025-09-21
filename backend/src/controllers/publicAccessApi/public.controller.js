const Category = require("../../models/catalogAndInventory/category.model");
const { ApiResponse } = require("../../utils/ApiResponse");

exports.getCategories = async (req, res , next) =>{
    try {
// find the products inside the category    
        const categories = await Category.find().populate('products');

        const categoryList = categories.map(category => ({
            id: category._id,
            name: category.name,
            image: category.image,
            slug: category.slug,
            products: category.products || []
        }));

        const response = new ApiResponse(200, "Categories fetched successfully", {
            categories: categoryList
        });
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}