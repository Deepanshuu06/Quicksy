import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center sticky top-0 z-50">
       <Link to="/dashboard">
        <div className="text-2xl font-bold text-green-600">Quicksy Store</div> </Link>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 focus:outline-none">
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        <ul
          className={`md:flex md:items-center md:space-x-6 absolute md:static bg-white md:bg-transparent w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-4 transition-all duration-300 ease-in ${
            menuOpen ? "top-12 opacity-100" : "top-[-490px] opacity-0"
          } md:opacity-100`}>
          <li>
            <Link to="/dashboard">
              <span className="block px-3 py-2 text-gray-700 hover:text-green-600 font-medium">
                Dashboard
              </span>
            </Link>
          </li>
          <li>
            <Link to="/products-management">
              <span className="block px-3 py-2 text-gray-700 hover:text-green-600 font-medium">
                Products
              </span>
            </Link>
          </li>
          <li>
            <Link to="/inventory">
              <span className="block px-3 py-2 text-gray-700 hover:text-green-600 font-medium">
                Inventory
              </span>
            </Link>
          </li>
          <li>
            <Link to="/order-management">
              <span className="block px-3 py-2 text-gray-700 hover:text-green-600 font-medium">
                Order Management
              </span>
            </Link>
          </li>
          <li>
            <Link to="/delivery-partners">
              <span className="block px-3 py-2 text-gray-700 hover:text-green-600 font-medium">
                Delivery Partners
              </span>
            </Link>
          </li>
          <img
            className="w-8 h-8 rounded-full"
            src="https://revgineer.com/wp-content/uploads/2019/12/ThisPersonDoesNotExist_fail2.jpg"
            alt="admin"
          />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
