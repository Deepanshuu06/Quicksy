
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center sticky top-0 z-50"> 
        <div className="text-2xl font-bold text-green-600">Quicksy Store</div>
        <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
                {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
            </div>
            <ul className={`md:flex md:items-center md:space-x-6 absolute md:static bg-white md:bg-transparent w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-4 transition-all duration-300 ease-in ${menuOpen ? 'top-12 opacity-100' : 'top-[-490px] opacity-0'} md:opacity-100`}>
            <li>
                <a href="/" className="block px-3 py-2 text-gray-700 hover:text-green-600 font-medium">Dashboard</a>
            </li>
            <li>
                <a href="/products" className="block px-3 py-2 text-gray-700 hover:text-green-600 font-medium">Products</a>
            </li>
            <li>
                <a href="/inventory" className="block px-3 py-2 text-gray-700 hover:text-green-600 font-medium">Inventory</a>
            </li>
            <li>
                <a href="/orders" className="block px-3 py-2 text-gray-700 hover:text-green-600 font-medium">Order Management</a>
            </li>
            <li>
                <a href="/delivery-partners" className="block px-3 py-2 text-gray-700 hover:text-green-600 font-medium">Delivery Partners</a>
            </li>
        </ul>
      </div>    
    </nav>
  );
};

export default Navbar;
