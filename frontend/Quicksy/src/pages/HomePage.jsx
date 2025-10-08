import React from "react";
import { ChevronRight } from "lucide-react";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router";
import ProductCard from "../components/ProductCard";

function HomePage() {
  const [categories, setCategories] = React.useState([]);
  const [promoBanners, setPromoBanners] = React.useState([]);
  const [dairy, setDairy] = React.useState([]);
  const [beverage, setBeverage] = React.useState([]);
  const [vegetables, setVegetables] = React.useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await axios.get("http://localhost:7777/api/v1/public/home");
        setCategories(res?.data?.data?.categories || []);
        setPromoBanners(res?.data?.data?.banners || []);
        setDairy(res?.data?.data?.categories[1]);
        setBeverage(res?.data?.data?.categories[3]);
        setVegetables(res?.data?.data?.categories[0]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchCategories();
  }, []);

  return (
    <div className="bg-gray-50 pb-16">
      <div className="max-w-7xl mx-auto px-4 py-4 hidden md:block lg:block">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {promoBanners.map((banner, idx) => (
            <img
              key={idx}
              src={banner.imageUrl}
              alt={`Promo ${idx + 1}`}
              className="rounded-lg w-full h-60 object-cover cursor-pointer"
            />
          ))}
        </div>
      </div>

      {/* categories section */}
      {categories.length > 0 && (
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
      )}

      {/* Vegetables section */}
      {vegetables?.products?.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">{vegetables?.name}</h2>
            <Link to={`/category/${vegetables?.id}`}>
              <button className="text-green-600 text-sm font-medium flex items-center hover:underline">
                See all <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </Link>
          </div>

          <div className="flex overflow-x-auto space-x-4 pb-2">
            {vegetables?.products?.map((product, idx) => (
                 <ProductCard product={product} key={idx} />
            ))}
          </div>
        </section>
      )}


      {/* dairy section */}
      {dairy?.products?.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">{dairy?.name}</h2>
            <Link to={`/category/${dairy?.id}`}>
              <button className="text-green-600 text-sm font-medium flex items-center hover:underline">
                See all <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </Link>
          </div>

          <div className="flex overflow-x-auto space-x-4 pb-2">
            {dairy?.products?.map((product, idx) => (

               <ProductCard product={product} key={idx} />
            ))}
          </div>
        </section>
      )}

      {/* beverage section */}
      {beverage?.products?.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">{`Best of ${beverage?.name}`}</h2>
            <Link to={`/category/${beverage?.id}`}>
              <button className="text-green-600 text-sm font-medium flex items-center hover:underline">
                See all <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </Link>
          </div>

          <div className="flex overflow-x-auto space-x-4 pb-2">
            {beverage?.products?.map((product, idx) => (
              <ProductCard product={product} key={idx} />
            ))}
          </div>
        </section>
      )}


    </div>
  );
}

export default HomePage;
