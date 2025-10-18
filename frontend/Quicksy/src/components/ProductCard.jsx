import React from "react";
import { Link } from "react-router";
import { toast } from "react-hot-toast";
import axios from "axios";

function ProductCard({ product }) {
  const hasDiscount = product?.oldPrice && product?.oldPrice > product?.price;
  

  const handleAddToCart = async(e) => {
    e.preventDefault(); // Prevent navigating to product page
    try {
      await axios.post("http://localhost:7777/api/v1/cart", { productId: product?._id }, {
        withCredentials: true,
      });
      toast.success(`${product?.name} added to cart`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error(error?.response?.data?.message);
    }

  };

  return (

      <Link to={`/product/${product?._id}`}>

         <div className="min-w-[180px] bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-200">
      {/* Image + Offer Badge */}
      <div className="relative ">
        {hasDiscount && (
          <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-md">
            {Math.round(((product?.oldPrice - product?.price) / product?.oldPrice) * 100)}% OFF
          </div>
        )}
        <img
          src={product?.images[0]}
          alt={product?.name}
          className=" h-44 object-contain rounded-t-2xl rounded-b-lg bg-white w-full"
        />
      </div>

      {/* Product Info */}
      <div className="px-3 pb-3 text-sm">
        {/* Delivery time */}
        <div className="flex items-center text-xs text-gray-500 mb-1 mt-2">
          <span className="mr-1">⏱️</span>
          {product?.deliveryTime || "9 MINS"}
        </div>

        {/* Product name */}
        <div className="font-medium text-gray-800 line-clamp-2">
          {product?.name}
        </div>

        {/* Quantity */}
        <div className="text-gray-500 text-xs mt-0.5">
          {product?.attributes?.weight || ""}
        </div>

        {/* Price + Add Button */}
        <div className="flex justify-between items-center mt-2">
          <div className="flex flex-col">
            <span className="font-semibold text-lg text-gray-800">
              ₹{product?.price}
            </span>
            {hasDiscount && (
              <span className="text-gray-400 text-xs line-through">
                ₹{product?.oldPrice}
              </span>
            )}
          </div>


          <button className="border border-green-600 text-green-600 text-xs font-semibold px-5 py-2 rounded-md hover:bg-green-600 hover:text-white transition cursor-pointer"
          onClick={handleAddToCart }
          >
            ADD
          </button>

        </div>
      </div>
    </div>
      </Link>
   
  );
}

export default ProductCard;
