import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../store/authSlice";
import { useNavigate } from "react-router";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

   useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);


  const [formData, setFormData] = useState({
    email: "manager@freshmartstore.com",
    store: "68cdde95b098bde863ed5d40",
    password: "Jhimjhim@18",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchAdmin = async () => {
    try {

      await axios.post(
        "http://localhost:7777/api/v1/admin/login",
        formData,
        {
          withCredentials: true,
        }
      );
      dispatch(checkAuth());

      toast.success("Login successful!");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchAdmin();
  };

  // if(userloggedIn){
  //   navigate('/dashboard');
  // }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Login to Dashboard
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="store"
              className="block text-sm font-medium text-gray-700">
              Store ID
            </label>
            <input
              type="text"
              id="store"
              name="store"
              value={formData.store}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
