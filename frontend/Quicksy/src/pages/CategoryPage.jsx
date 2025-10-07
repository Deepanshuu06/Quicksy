import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Loader2 } from "lucide-react";
import ProductCard from "../components/ProductCard";

function CategoryPage() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get(
          `http://localhost:7777/api/v1/public/products?categoryId=${id}`
        );
        setProducts(res?.data?.data?.products || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [id]);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Products in Category
        </h2>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <Loader2 className="animate-spin text-green-600 w-6 h-6" />
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            No products found in this category.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {products.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="bg-white rounded-lg shadow hover:shadow-md transition p-3 group">
                <ProductCard product={product} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryPage;
