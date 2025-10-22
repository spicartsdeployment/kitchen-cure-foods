import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { Plus, Minus, Trash } from "lucide-react";

const CartPage = () => {
  const { cart, removeFromCart, clearCart, increaseQty, decreaseQty } =
    useContext(CartContext);

  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  const tax = subtotal * 0.05;
  const totalAmount = subtotal + tax;

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Check your connection.");
      return;
    }

    const options = {
      key: "rzp_test_YourKeyHere", // Replace with your Razorpay Key ID
      currency: "INR",
      amount: totalAmount * 100,
      name: "The Grape Threads",
      description: "Order Payment",
      image: "/logo.png",
      handler: function (response) {
        alert(
          `Payment successful! Payment ID: ${response.razorpay_payment_id}`
        );
        clearCart();
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: { color: "#4a3f35" },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <img
          src="/src/assets/empty-cart.webp"
          alt="empty-cart"
          className="w-50 h-auto object-contain rounded-2xl"
        />
        <h2 className="text-2xl font-semibold text-gray-700">
          Your cart is empty
        </h2>
        <p className="py-4">Let's fill it with goodness from nature 🌿</p>
        <button
          onClick={() => {
            navigate("/products");
          }}
          className="bg-green-700 hover:bg-green-800 text-white py-2 px-6 rounded-lg transition"
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-6xl container mx-auto mt-8 px-8 py-8 grid md:grid-cols-3 gap-2">
        <div className="md:col-span-2 border border-gray-100 shadow-md rounded-2xl p-4">
          <h2 className="text-2xl font-semibold mb-4 border-b border-amber-500 pb-2">
            Shopping Cart
          </h2>
          <div className="min-h-screen p-4 bg-gray-50">
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-sm space-y-4 sm:space-y-0"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={
                        item.images?.[0] || "src/assets/placeholder-image.png"
                      }
                      alt={item.name}
                      className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="text-lg font-medium">{item.name}</h3>
                      <p className="text-gray-500 text-sm">{item.caption}</p>
                      <p className="font-semibold text-green-700 py-2">
                        ₹{item.price.toFixed(2)} x {item.quantity || 1}
                      </p>

                      {/* Quantity controls */}
                      <div className="w-fit px-2 flex items-center justify-center font-bold border-2 border-amber-400 rounded-full text-xs sm:text-sm">
                        <button
                          onClick={() => {
                            if (item.quantity > 1) {
                              decreaseQty(item._id);
                            } else {
                              removeFromCart(item._id);
                            }
                          }}
                          className="px-2 cursor-pointer"
                        >
                          {item.quantity > 1 ? (
                            <Minus size={15} />
                          ) : (
                            <Trash size={15} />
                          )}
                        </button>

                        <span className="px-4 text-sm text-gray-800">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => increaseQty(item._id)}
                          className="px-2 cursor-pointer"
                        >
                          <Plus size={15} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="p-2 border border-red-700 text-red-700 text-xs rounded-lg cursor-pointer hover:bg-red-700 hover:text-white"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="border border-gray-100 shadow-md rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="space-y-2 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (5%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-semibold text-lg border-t pt-2">
              <span>Total</span>
              <span className="text-green-700">₹{totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={displayRazorpay}
            disabled={!cart.length}
            className={`mt-6 w-full py-3 rounded-lg text-lg font-semibold text-white cursor-pointer transition ${
              cart.length
                ? "bg-amber-500 hover:bg-amber-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Pay Now
          </button>

          <p className="text-sm text-gray-500 text-center mt-3">
            Secure payment powered by Razorpay
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
