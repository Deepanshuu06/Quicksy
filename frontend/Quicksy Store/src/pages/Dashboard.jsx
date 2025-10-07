import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  TrendingUp,
  ShoppingBag,
  Truck,
  Clock,
  AlertTriangle,
  Plus,
  Package,
  Users,
  Eye,
} from "lucide-react";
import axios from "axios";

const Dashboard = () => {
  // const [data, setData] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [activeOrders, setActiveOrders] = useState([]);
  const [last24HoursOrders, setLast24HoursOrders] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7777/api/v1/admin/orders",
        {
          withCredentials: true,
        }
      );
      const ordersArr = Array.isArray(response?.data?.orders) ? response.data.orders : [];
      setLast24HoursOrders(
        ordersArr.filter(order => {
          if (!order.createdAt) return false;
          return new Date(order.createdAt) >= new Date(Date.now() - 24*60*60*1000);
        })
      );
      setActiveOrders(response?.data?.data?.orders?.filter(order => order.orderStatus !== 'delivered' && order.orderStatus !== 'cancelled'));
      setRecentOrders(response?.data?.data?.orders);

    } catch (error) {
      console.error("Error fetching admin profile:", error);
    }
  };



  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      <main className="flex-1 px-6 py-6 space-y-8 max-w-7xl w-full mx-auto">
        {/* Header */}
        <header className="px-6 py-4 border-b border-gray-200 bg-white ">
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
            <Package className="w-6 h-6 text-green-600" /> Dashboard Overview
          </h1>
          <p className="text-sm text-gray-500">
            Admin control panel for Blinkit clone
          </p>
        </header>

        {/* --- STAT CARDS --- */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              label: "Total Revenue (24h)",
              value: last24HoursOrders.reduce((sum, order) => sum + (Number(order.totalAmount) || 0), 0),
              change: "+10%",
              color: "text-green-600",
              icon: TrendingUp,
            },
            {
              label: "Active Orders (Live)",
              value: activeOrders.length,
              color: "text-blue-600",
              icon: ShoppingBag,
            },
            {
              label: "Delivery Partners (Online)",
              value: "8",
              color: "text-orange-500",
              icon: Truck,
            },
            {
              label: "Average Delivery Time",
              value: "28 mins",
              color: "text-purple-600",
              icon: Clock,
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">
                  {stat.label}
                </p>
                <h2 className={`text-3xl font-semibold ${stat.color}`}>
                  {stat.value}
                </h2>
                {stat.change && (
                  <p className="text-xs text-green-500 mt-1 font-medium">
                    {stat.change} vs last month
                  </p>
                )}
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          ))}
        </section>

        {/* --- DAILY REVENUE TREND --- */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-3 text-gray-800 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" /> Daily Revenue
            Trend
          </h2>
          <div className="h-56 flex items-center justify-center text-gray-400 bg-gray-50 rounded-xl border border-dashed">
            [Graph Placeholder]
          </div>
        </section>

        {/* --- RECENT ORDERS --- */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 overflow-x-auto">
          <h2 className="text-lg font-semibold mb-3 text-gray-800 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-blue-600" /> Recent Active
            Orders
          </h2>
          <table className="w-full min-w-[600px] text-sm text-left border-collapse">
            <thead>
              <tr className="text-gray-600 border-b bg-gray-50">
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Status</th>
                <th className="p-3">Total</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, i) => (
                <tr
                  key={i}
                  className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-3 font-medium text-gray-800">
                    {order.orderId}
                  </td>
                  <td className="p-3">{order?.user?.name}</td>

                  <td
                    className={`p-3 ${
                      order.orderStatus === "Delivered"
                        ? "text-green-600"
                        : "text-blue-600"
                    }`}>
                    {order.orderStatus}
                  </td>
                  <td className="p-3">{order.totalAmount}</td>
                  <td className="p-3">
                    <Link
                      to={`/order/${order._id}`}
                      className="text-indigo-600 font-medium hover:underline flex items-center gap-1">
                      <Eye className="w-4 h-4" /> View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* --- CRITICAL ALERTS --- */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-3 text-gray-800 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" /> Critical Alerts
          </h2>
          <ul className="list-disc list-inside text-sm text-red-600 space-y-1">
            <li>Low stock on Product XYZ</li>
            <li>New order placed - Order #12346</li>
            <li>Delivery delay reported by Partner ABC</li>
          </ul>
        </section>

        {/* --- QUICK ACTIONS --- */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-3 text-gray-800 flex items-center gap-2">
            <Plus className="w-5 h-5 text-green-600" /> Quick Actions
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              { text: "Add Product", color: "green" },
              { text: "View Orders", color: "blue" },
              { text: "Manage Inventory", color: "orange" },
              { text: "Add Partner", color: "purple" },
            ].map((btn, i) => (
              <button
                key={i}
                className={`px-4 py-2 bg-${btn.color}-500 text-white rounded-xl hover:bg-${btn.color}-600 transition-all duration-200 flex items-center gap-2`}>
                <Plus className="w-4 h-4" /> {btn.text}
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
