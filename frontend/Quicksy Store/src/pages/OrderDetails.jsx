import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  User,
  MapPin,
  Package,
  CreditCard,
  Clock,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import Navbar from "../components/Navbar";
import axios from "axios";

const OrderDetails = () => {
    // Example dummy order data (replace with API data)
//   const order = {
//     orderId: "ORD_5po2ec",
//     orderStatus: "pending",
//     paymentMethod: "COD",
//     paymentStatus: "pending",
//     totalAmount: 65,
//     createdAt: "2025-10-02T16:59:46.411Z",
//     updatedAt: "2025-10-02T16:59:46.411Z",
//     user: {
//       name: "Deepanshu",
//       email: "alice.johnson@example.com",
//       phone: "+14154355351",
//       profileImage: "https://www.google.com",
//     },
//     deliveryAddress: {
//       addressType: "HOME",
//       street: "1234 Elm Street",
//       city: "Gotham",
//       state: "New York",
//       postalCode: "123456",
//       country: "USA",
//     },
//     items: [
//       {
//         product: {
//           name: "Amul Full Cream Milk 1L",
//           price: 65,
//           sku: "AMUL-MILK-1L",
//         },
//         quantity: 1,
//       },
//     ],
//   };

  const [order, setOrder] = useState(null);

  const { orderId } = useParams();

  const fetchOrderById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:7777/api/v1/admin/order/${orderId}`,
        {
          withCredentials: true,
        }
      );
        setOrder(response?.data?.data?.order);
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

console.log(order);

  useEffect(() => {
    fetchOrderById();
  }, []);

  const formatDate = (date) =>
    new Date(date).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "completed":
        return "text-green-600 bg-green-100";
      case "cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
   <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6">
        {/* Header */}
        <div className="max-w-5xl mx-auto mb-6 flex items-center justify-between">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">
            Order Details - {order?.orderId}
          </h1>
        </div>

        {/* Order Overview */}
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-8">
          {/* --- Status & Info --- */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4">
              <Package className="w-10 h-10 text-green-600 bg-green-50 p-2 rounded-full" />
              <div>
                <h2 className="font-semibold text-gray-700">Order Status</h2>
                <span
                  className={`inline-flex px-3 py-1 text-sm rounded-full font-medium mt-1 ${getStatusColor(
                    order?.orderStatus
                  )}`}>
                  {order?.orderStatus.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <CreditCard className="w-10 h-10 text-blue-600 bg-blue-50 p-2 rounded-full" />
              <div>
                <h2 className="font-semibold text-gray-700">Payment Info</h2>
                <p className="text-sm text-gray-600">
                  Method: {order?.paymentMethod}
                </p>
                <p className="text-sm text-gray-600 capitalize">
                  Status: {order?.paymentStatus}
                </p>
              </div>
            </div>
          </div>

          {/* --- User Info --- */}
          <div className="border-t border-gray-100 pt-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
              <User className="w-5 h-5 text-indigo-600" /> Customer Details
            </h2>
            <div className="bg-gray-50 rounded-xl p-4 grid sm:grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-gray-700">{order?.user?.name}</p>
                <p className="text-sm text-gray-600">{order?.user?.email}</p>
                <p className="text-sm text-gray-600">{order?.user?.phone}</p>
              </div>
              <div className="flex items-center justify-end">
                <img
                  src={order?.user?.profileImage}
                  alt={order?.user?.name}
                  className="w-16 h-16 rounded-full object-cover border border-gray-200"
                />
              </div>
            </div>
          </div>

          {/* --- Delivery Address --- */}
          <div className="border-t border-gray-100 pt-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
              <MapPin className="w-5 h-5 text-red-600" /> Delivery Address
            </h2>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-700">
                <strong>{order?.deliveryAddress?.addressType}</strong> —{" "}
                {order?.deliveryAddress?.street}, {order?.deliveryAddress?.city},{" "}
                {order?.deliveryAddress?.state}, {order?.deliveryAddress?.country} -{" "}
                {order?.deliveryAddress?.postalCode}
              </p>
            </div>
          </div>

          {/* --- Ordered Items --- */}
          <div className="border-t border-gray-100 pt-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
              <Package className="w-5 h-5 text-green-600" /> Ordered Items
            </h2>
            <div className="bg-gray-50 rounded-xl p-4 overflow-x-auto">
              <table className="w-full min-w-[500px] text-sm text-left border-collapse">
                <thead>
                  <tr className="text-gray-600 border-b">
                    <th className="p-3">Product</th>
                    <th className="p-3">SKU</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Quantity</th>
                    <th className="p-3">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order?.items?.map((item, i) => (
                    <tr key={i} className="border-b hover:bg-gray-100">
                      <td className="p-3 font-medium text-gray-800">
                        {item?.product?.name}
                      </td>
                      <td className="p-3">{item?.product?.sku}</td>
                      <td className="p-3">${item?.product?.price}</td>
                      <td className="p-3">{item?.quantity}</td>
                      <td className="p-3 font-semibold text-gray-800">
                        ${item?.product?.price * item?.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* --- Order Summary --- */}
          <div className="border-t border-gray-100 pt-6 grid sm:grid-cols-2 gap-6">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-2">
                <Clock className="w-5 h-5 text-gray-600" /> Timeline
              </h2>
              <p className="text-sm text-gray-600">
                <strong>Created:</strong> {formatDate(order?.createdAt)}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Updated:</strong> {formatDate(order?.updatedAt)}
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-xl flex flex-col items-end justify-center">
              <h2 className="text-lg font-semibold text-gray-800">
                Total Amount
              </h2>
              <p className="text-3xl font-bold text-green-600">
                ${order?.totalAmount}
              </p>
            </div>
          </div>
        </div>
      </div>

      
    </>
  );
};

export default OrderDetails;
