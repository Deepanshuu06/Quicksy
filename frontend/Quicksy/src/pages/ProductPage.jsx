import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);


  console.log("Product ID:", product);
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get(
          `http://localhost:7777/api/v1/public/product/${id}`
        );
      
        setProduct(res?.data?.data?.product || null);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  const handleAddToCart = async (product) => {
    try {
      await axios.post("http://localhost:7777/api/v1/cart", { productId: product._id }, {
        withCredentials: true,
      });
      toast.success("Product added to cart!");
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-green-600" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center text-gray-600">
        Product not found.
      </div>
    );
  }

  return (
    <div className="bg-white min-h-[calc(100vh-64px)] px-4 py-6 md:py-10 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="flex justify-center md:justify-start items-start">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full max-w-xs lg:max-w-md h-auto object-contain rounded-xl shadow-md"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-start space-y-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            {product.name}
          </h1>
          <p className="text-sm text-gray-500">{product.description}</p>

          {product.attributes?.weight && (
            <p className="text-sm text-gray-600">
              <span className="font-medium">Weight:</span>{" "}
              {product.attributes.weight}
            </p>
          )}

          {/* Price Info */}
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-bold text-gray-800">
              ₹{product.price}
            </span>
            {product.mrp && product.mrp > product.price && (
              <>
                <span className="line-through text-sm text-gray-400">
                  ₹{product.mrp}
                </span>
                <span className="text-green-600 text-sm font-semibold">
                  {Math.round(
                    ((product.mrp - product.price) / product.mrp) * 100
                  )}
                  % OFF
                </span>
              </>
            )}
          </div>

          {/* Quantity Selector + Add to Cart */}
          <div className="flex items-center gap-4 flex-wrap mt-4">
            <div className="flex border border-gray-300 rounded-md overflow-hidden w-fit">
              <button
                onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                className="px-3 py-1 text-gray-700 hover:bg-gray-100 text-lg cursor-pointer">
                –
              </button>
              <span className="px-4 py-1 text-gray-800">{qty}</span>
              <button
                onClick={() => setQty((prev) => prev + 1)}
                className="px-3 py-1 text-gray-700 hover:bg-gray-100 text-lg cursor-pointer">
                +
              </button>
            </div>

            <button
              onClick={() => handleAddToCart(product)}
              className={`px-6 py-2 rounded-md font-medium transition text-white cursor-pointer ${
                added ? "bg-green-400" : "bg-green-600 hover:bg-green-700"
              }`}>
              {added ? "Added!" : "Add to Cart"}
            </button>
          </div>

          {product.attributes?.brand && (
            <p className="text-sm text-gray-600">
              <span className="font-medium">Brand:</span>{" "}
              {product.attributes.brand}
            </p>
          )}
        </div>
      </div>

      {/* Sticky Add to Cart Button for Mobile */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 px-4 py-3 md:hidden flex justify-between items-center z-50">
        <div>
          <span className="text-base font-semibold text-gray-800">
            ₹{product.price}
          </span>
          {product.mrp && product.mrp > product.price && (
            <span className="ml-2 text-sm text-green-600 font-medium">
              {Math.round(((product.mrp - product.price) / product.mrp) * 100)}%
              OFF
            </span>
          )}
        </div>
        <button
          onClick={handleAddToCart}
          className={`px-5 py-2 rounded-md font-medium text-sm text-white ${
            added ? "bg-green-400" : "bg-green-600 hover:bg-green-700"
          }`}>
          {added ? "Added!" : "Add to Cart"}
        </button>
      </div>

      <div className="mt-12 ">
        <h2 className="text-xl font-semibold text-gray-800">Similar products</h2>
        
      </div>
    </div>
  );
};

export default ProductPage;
