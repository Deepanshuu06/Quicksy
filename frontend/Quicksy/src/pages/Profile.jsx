import axios from "axios";
import React, { useEffect, useState } from "react";
import { logout } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  Mail,
  Phone,
  MapPin,
  Package,
  Loader2,
  User,
  Wallet,
} from "lucide-react";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get("http://localhost:7777/api/v1/user/profile", {
        withCredentials: true,
      });
      setUserData(res?.data?.data);
    } catch (err) {
      console.error("Error fetching user profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:7777/api/v1/auth/logout",
        {},
        { withCredentials: true }
      );
      dispatch(logout());
      setUserData(null);
      navigate("/login");
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  // ====== Loading State ======
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-green-600">
        <Loader2 className="animate-spin w-8 h-8 mb-3" />
        <p className="text-gray-700 font-medium">Loading your profile...</p>
      </div>
    );
  }

  // ====== No User Data ======
  if (!userData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-700">
        <User className="w-10 h-10 mb-3 text-gray-400" />
        <p className="text-center">Session expired or no profile found.</p>
        <button
          onClick={() => navigate("/login")}
          className="mt-4 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Login Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-green-700 text-center mb-8">
        My Profile
      </h1>

      <div className="max-w-3xl mx-auto bg-white shadow-sm rounded-2xl p-6 space-y-6 border border-gray-100">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src={userData.profileImage || "/default-avatar.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border border-gray-200"
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {userData.name}
            </h2>
            <p className="flex items-center text-gray-600 mt-1">
              <Mail className="w-4 h-4 mr-2" /> {userData.email}
            </p>
            <p className="flex items-center text-gray-600 mt-1">
              <Phone className="w-4 h-4 mr-2" /> {userData.phone || "N/A"}
            </p>
          </div>
        </div>

        {/* Wallet Card */}
        <div className="bg-gradient-to-r from-green-600 to-green-500 text-white rounded-2xl p-5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <Wallet className="w-6 h-6" />
            <div>
              <p className="text-sm opacity-80">Wallet Balance</p>
              <h3 className="text-2xl font-bold">
                ₹{userData.walletBalance?.toFixed(2) || "0.00"}
              </h3>
            </div>
          </div>
          <button className="bg-white text-green-700 px-4 py-1.5 rounded-lg font-medium hover:bg-gray-100 transition">
            Add Money
          </button>
        </div>

        {/* Address Section */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-green-600" /> Saved Addresses
          </h3>
          {userData.addresses?.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {userData.addresses.map((addr, i) => (
                <div
                  key={i}
                  className="p-4 border border-gray-200 rounded-xl bg-gray-50"
                >
                  <p className="font-medium text-gray-800">{addr.label || "Home"}</p>
                  <p className="text-gray-600 text-sm mt-1">
                    {addr.street}, {addr.city}, {addr.state} - {addr.zipCode}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">{addr.country}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No saved addresses yet.</p>
          )}
        </div>

        {/* Orders Section */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
            <Package className="w-5 h-5 mr-2 text-green-600" /> My Orders
          </h3>
          {userData.orders?.length > 0 ? (
            <div className="space-y-4">
              {userData.orders.map((order, i) => (
                <div
                  key={i}
                  className="p-4 border border-gray-200 rounded-xl bg-gray-50 hover:shadow-sm transition"
                >
                  <p className="text-gray-700">
                    <span className="font-semibold">Order ID:</span> {order.id}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Status:</span>{" "}
                    <span
                      className={`px-2 py-0.5 rounded-md text-sm ${
                        order.orderStatus === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Total:</span> ₹
                    {order.totalAmount?.toFixed(2)}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Placed on:</span>{" "}
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">You haven’t placed any orders yet.</p>
          )}
        </div>

        {/* Logout */}
        <div className="text-center pt-4">
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-2.5 rounded-lg hover:bg-red-700 transition"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
