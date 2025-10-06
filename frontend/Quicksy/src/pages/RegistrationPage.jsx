import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';

function RegistrationPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    name:"",
    email:"",
    phone:"",
    password:"",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try { 
        await axios.post('http://localhost:7777/api/v1/auth/register', formData);
      setFormData({
        name:"",
        email:"",
        phone:"",
        password:"",
      });
      toast.success("Registration successful! Please log in.");
      navigate('/login');

    } catch (error) {
        console.error("Registration failed:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.id]: e.target.value,
    });
  };


  return (
    <div className="flex items-center justify-center px-4 py-12 bg-gray-50 min-h-[calc(100vh-64px)]">
      {/* Adjust 64px to match your navbar height if it's different */}

      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
          Create your Quicksy account
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="text"
              placeholder="+1234567890"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              value={formData.phone}
              onChange={handleChange}
            />
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Register
          </button>

          {/* Signup / Forgot Links */}
          <div className="text-sm text-center text-gray-600 mt-4">
            <p className='flex justify-center items-center'>
              Already have an account?{" "}
              <Link to="/login" className='text-green-600 font-medium hover:underline'>
                 {" "} Sign In

              </Link>
            </p>
            
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegistrationPage