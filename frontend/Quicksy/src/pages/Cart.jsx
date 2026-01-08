import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Minus, Trash2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  // Fetch Cart Items
  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:7777/api/v1/cart/", {
        withCredentials: true,
      });
      setCartItems(res?.data?.data || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  // Quantity Increase
  const increaseQuantity = async (id) => {
    try {

      setUpdating(id);
      setCartItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
      await axios.patch(
        `http://localhost:7777/api/v1/cart/${id}/increment`,
        {},
        { withCredentials: true }
      );

    } catch (err) {
      console.error("Error increasing quantity:", err);
      setCartItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
      toast.error(err?.response?.data?.message || "Error increasing quantity");
    } finally {
      setUpdating(null);
    }
  };

  // Quantity Decrease
  const decreaseQuantity = async (id) => {
    try {
      setUpdating(id);

        setCartItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
    );


      await axios.patch(
        `http://localhost:7777/api/v1/cart/${id}/decrement`,
        {},
        { withCredentials: true }
      );

    } catch (err) {
      console.error("Error decreasing quantity:", err);
      toast.error(err?.response?.data?.message || "Error decreasing quantity");
      setCartItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
    } finally {
      setUpdating(null);
    }
  };

  // Delete Cart Item
  const deleteItem = async (id) => {
    try {
      setUpdating(id);
      console.log("Deleting item:", id);
      await axios.delete(`http://localhost:7777/api/v1/cart/${id}`,{
        withCredentials: true,
      });

    setCartItems((prev) => prev.filter((item) => item._id !== id));
       await fetchCartItems();
    } catch (err) {
      console.error("Error deleting item:", err);
    } finally {
      setUpdating(null);
    }
  };

  // ================= CALCULATIONS =================
  const subTotal = cartItems.reduce(
    (sum, item) => sum + item?.product?.price * item?.quantity,
    0
  );  
  const deliveryCharge = subTotal > 499 ? 0 : 49;
  const gst = (subTotal * 0.05).toFixed(2);
  const discount = subTotal > 999 ? subTotal * 0.05 : 0; // 5% discount
  const grandTotal = (subTotal - discount + deliveryCharge + parseFloat(gst)).toFixed(2);

  // ================= UI =================
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-green-600">
        <Loader2 className="w-8 h-8 animate-spin mb-3" />
        <p>Loading your cart...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
        My Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[50vh] text-gray-500">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-illustration-svg-download-png-1800917.png"
            alt="Empty Cart"
            className=" h-44 opacity-80 mb-5"
          />
          <p className="text-lg font-medium">Your cart is empty</p>
          <p className="text-sm text-gray-400 mt-1">
            Add items to start your order!
          </p>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto grid lg:grid-cols-3 gap-6">
          {/* LEFT: CART ITEMS */}
          <div className="lg:col-span-2 space-y-5">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row justify-between bg-white border border-gray-100 shadow-sm rounded-xl p-4"
              >
                <Link to={"/product/" + item?.product?._id} className="flex-1">
                <div className="flex gap-4">
                  <img
                    src={item?.product?.images?.[0] || "/default-product.png"}
                    alt={item?.product?.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div>

                    <h3 className="text-lg font-semibold text-gray-800">
                      {item?.product?.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      ₹{item?.product?.price.toFixed(2)} per item
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Total:{" "}
                      <span className="font-semibold text-gray-800">
                        ₹{(item?.product?.price * item?.quantity).toFixed(2)}
                      </span>
                    </p>
                  </div>
                </div>
                </Link>

                {/* Quantity + Delete */}
                <div className="flex items-center gap-4 mt-3 sm:mt-0">
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => {
                        if(item?.quantity > 1) {
                          decreaseQuantity(item?._id)
                        }else{
                          deleteItem(item?._id)
                        }
                      }}
                      disabled={updating === item?._id }
                      className="px-2 py-1 text-gray-700 hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-3 py-1 text-gray-800 font-medium">
                      {item?.quantity}
                    </span>
                    <button
                      onClick={() => increaseQuantity(item?._id)}
                      disabled={updating === item?._id}
                      className="px-2 py-1 text-gray-700 hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => deleteItem(item?.id)}
                    disabled={updating === item?.id}
                    className="text-red-600 hover:text-red-700 transition" 
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: PRICE DETAILS */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 h-fit">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Price Details
            </h2>

            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-green-600">-₹{discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span>₹{gst}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span>
                  {deliveryCharge === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `₹${deliveryCharge}`
                  )}
                </span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-lg font-semibold text-gray-900">
                <span>Total Amount</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>

            <button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-200">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
