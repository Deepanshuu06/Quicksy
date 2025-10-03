import React from "react";
import { ShoppingCart, MapPin } from "lucide-react";
import { Link } from "react-router";

function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        {/* Left Section: Logo & Location */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-2xl font-bold text-green-600">
            Quicksy
          </Link>

          <div className="hidden sm:flex items-center space-x-2 cursor-pointer">
            <MapPin className="h-5 w-5 text-green-600" />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-gray-800">
                Delivery in 10 mins
              </span>
              <span className="text-xs text-gray-500">Jabalpur, MP</span>
            </div>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 mx-4">
          <input
            type="text"
            placeholder="Search for atta, dal, snacks and more"
            className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-gray-500"
          />
        </div>

        {/* Right Section: Login & Cart */}
        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="hidden sm:inline-block text-sm font-medium text-gray-700 hover:text-green-600"
          >
            <button className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition cursor-pointer">
              Login
            </button>
          </Link>

          <button className="relative flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition cursor-pointer">
            <ShoppingCart className="h-5 w-5 mr-2" />
            <span className="font-medium text-sm">Cart</span>
            <span className="absolute -top-2 -right-2 bg-white text-green-600 text-xs rounded-full px-2 py-0.5 font-bold shadow-md">
              3
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
