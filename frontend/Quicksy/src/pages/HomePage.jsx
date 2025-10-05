import React from "react";
import { ChevronRight } from "lucide-react";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router";

const promoBanners = [
  "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2023-07/Pet-Care_WEB.jpg",
  "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2023-07/pharmacy-WEB.jpg",
  "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2023-03/babycare-WEB.jpg",
];

function HomePage() {
  const [categories, setCategories] = React.useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await axios.get(
          "http://localhost:7777/api/v1/public/categories"
        );
        setCategories(res?.data?.data?.categories || []);
        console.log(res.data?.data?.categories);
      } catch (err) {
        console.error(err);
      }
    }
    fetchCategories();
  }, []);

  return (
    <div className="bg-gray-50 pb-16">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4">
          {promoBanners.map((banner, idx) => (
            <img
              key={idx}
              src={banner}
              alt={`Promo ${idx + 1}`}
              className="rounded-lg w-full h-60 object-cover"
            />
          ))}
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 mt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Shop by Categories
        </h2>

        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-1">
          {categories.map((cat, index) => (
            <Link
              to={`/category/${cat.id}`}
              key={index}
              className="flex flex-col items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition">
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition cursor-pointer">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-t-lg"
                />
                <div className="p-2 text-center font-medium text-gray-700 text-sm">
                  {/* {cat.name} */}

                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Best of Beverages</h2>
          <button className="text-green-600 text-sm font-medium flex items-center hover:underline">
            See all <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>

        <div className="flex overflow-x-auto space-x-4 pb-2">
          {[...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className="min-w-[160px] bg-white rounded-lg shadow-sm hover:shadow-md transition">
              <img
                src={`/images/products/drink${idx + 1}.jpg`}
                alt={`Drink ${idx + 1}`}
                className="w-full h-32 object-cover rounded-t-lg"
              />
              <div className="p-2 text-sm text-gray-700">
                <div className="font-medium">Soft Drink {idx + 1}</div>
                <div className="text-gray-500 text-xs">750ml</div>
                <div className="font-semibold mt-1">₹45</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
