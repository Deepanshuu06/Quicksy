import React, { useState } from "react";
import { ShoppingCart, MapPin, Menu, X } from "lucide-react";
import { Link } from "react-router-dom"; // Use react-router-dom instead of react-router



function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);



  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Hamburger for mobile */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-green-600">
            Quicksy
          </Link>

          {/* Location (hidden on xs) */}
          <div className="hidden sm:flex items-center space-x-2 cursor-pointer">
            <MapPin className="h-5 w-5 text-green-600" />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-gray-800">Delivery in 10 mins</span>
              <span className="text-xs text-gray-500">Jabalpur, MP</span>
            </div>
          </div>
        </div>

        {/* Center: Search bar (hidden on mobile) */}
        <div className="hidden md:flex flex-1 mx-6">
         <Link to="/search" className="w-full">
          <input
            type="text"
            placeholder="Search for atta, dal, snacks and more"
            className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-gray-500"
          />
         </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Login Button (hidden on xs) */}
          <Link to="/login" className="hidden sm:block">
            <button className="px-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-100 transition">
              Login
            </button>
          </Link>

          {/* Cart Button */}
          <Link to="/cart">
            <button className="relative flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
              <ShoppingCart className="h-5 w-5 mr-2" />
              <span className="font-medium text-sm hidden sm:inline">Cart</span>
              <span className="absolute -top-2 -right-2 bg-white text-green-600 text-xs rounded-full px-2 py-0.5 font-bold shadow-md">
                3
              </span>
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3 space-y-3">
          {/* Mobile Search */}
          <input
            type="text"
            placeholder="Search for products"
            className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Location Info */}
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-green-600" />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-gray-800">Delivery in 10 mins</span>
              <span className="text-xs text-gray-500">Jabalpur, MP</span>
            </div>
          </div>

          {/* Login Button */}
          <Link to="/login" className="block w-full">
            <button className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-100 transition">
              Login
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
