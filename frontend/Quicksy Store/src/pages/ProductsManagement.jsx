import React, {  useEffect, useState } from "react";
import { Plus, X, Edit, Trash2, CheckCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import axios from "axios";
import toast from "react-hot-toast";

const ProductsManagement = () => {
  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    sku: "",
    category: "",
    attributes: { weight: "", size: "", brand: "" },
    images: ["", ""],
  });
  const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

  const filteredProducts =
    filter === "all" ? products : products.filter((p) => p.isActive === (filter === "true"));




  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("attributes.")) {
      const attr = name.split(".")[1];
      setProductForm({
        ...productForm,
        attributes: { ...productForm.attributes, [attr]: value },
      });
    } else if (name.includes("images[")) {
      const index = Number(name.match(/\d+/)[0]);
      const updatedImages = [...productForm.images];
      updatedImages[index] = value;
      setProductForm({ ...productForm, images: updatedImages });
    } else {
      setProductForm({ ...productForm, [name]: value });
    }
  };

  const handleAddProduct = async(e) => {
   try {
     e.preventDefault();
    await axios.post('http://localhost:7777/api/v1/admin/product', productForm, { useCredentials: true });

    toast.success("Product added successfully!");
    setIsModalOpen(false);
    setProductForm({
      name: "",
      description: "",
      price: "",
      sku: "",
      category: "",
      attributes: { weight: "", size: "", brand: "" },
      images: ["", ""],
    });

   } catch (error) {
     console.error("Error adding product:", error);
     toast.error("Failed to add product. Please try again." + error?.response?.data?.message || "");
   }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7777/api/v1/admin/category",
        { useCredentials: true }
      );
      setCategories(response?.data?.data?.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7777/api/v1/admin/product",
        { useCredentials: true }
      );
      setProducts(response?.data?.data?.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);

    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [isModalOpen]);



  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Products Management
          </h1>
          <div className="flex items-center gap-3 mt-3 sm:mt-0">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-green-500">
              <option value="all">All Products</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
              <Plus className="w-4 h-4" /> Add Product
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">
              <tr>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts?.map((product) => (
                <tr
                  key={product?._id}
                  className="border-b hover:bg-gray-50 transition">
                  <td className="px-4 py-3">
                    <img
                      src={product?.images[0]}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {product?.name}
                  </td>
                  <td className="px-4 py-3 text-gray-700">₹{product?.price}</td>
                  <td className="px-4 py-3 text-gray-700">
                    {product?.category?.name}
                  </td>
                  <td className="px-4 py-3 text-gray-700">{product?.attributes?.weight}</td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1 text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs font-medium">
                      <CheckCircle className="w-3 h-3" /> Active
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- Add Product Modal --- */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-6 relative overflow-y-auto max-h-[90vh]">
              {/* Close button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Add New Product
              </h2>

              <form
                onSubmit={handleAddProduct}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  value={productForm.name}
                  onChange={handleInputChange}
                  className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"
                  required
                />

                <input
                  type="text"
                  name="sku"
                  placeholder="SKU"
                  value={productForm.sku}
                  onChange={handleInputChange}
                  className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"
                  required
                />

                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={productForm.price}
                  onChange={handleInputChange}
                  className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"
                  required
                />

                <select
                  name="category"
                  value={productForm.category}
                  onChange={handleInputChange}
                  className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500">

                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}

                </select>

                <textarea
                  name="description"
                  placeholder="Description"
                  value={productForm.description}
                  onChange={handleInputChange}
                  className="border rounded-lg px-3 py-2 text-sm col-span-2 focus:ring-2 focus:ring-green-500"
                  rows={3}
                  required
                />

                {/* Attributes */}
                <input
                  type="text"
                  name="attributes.weight"
                  placeholder="Weight (e.g., 1L)"
                  value={productForm.attributes.weight}
                  onChange={handleInputChange}
                  className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"
                  required
                />
                <input
                  type="text"
                  name="attributes.size"
                  placeholder="Size"
                  value={productForm.attributes.size}
                  onChange={handleInputChange}
                  className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"

                />
                <input
                  type="text"
                  name="attributes.brand"
                  placeholder="Brand"
                  value={productForm.attributes.brand}
                  onChange={handleInputChange}
                  className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"

                />

                {/* Image URLs */}
                <input
                  type="text"
                  name="images[0]"
                  placeholder="Image URL 1"
                  value={productForm.images[0]}
                  onChange={handleInputChange}
                  className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 col-span-2"
                  required
                />
                <input
                  type="text"
                  name="images[1]"
                  placeholder="Image URL 2"
                  value={productForm.images[1]}
                  onChange={handleInputChange}
                  className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 col-span-2"
                  required
                />

                <div className="col-span-2 flex justify-end mt-4">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition">
                    Save Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsManagement;
