import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import RazorpayButton from "../components/RazorpayButton";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <h2 className="text-3xl font-semibold text-green-800 mb-6 text-center">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty</p>
      ) : (
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
          {cart.map((item) => (
            <div key={item._id} className="flex justify-between items-center border-b py-3">
              <div>
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-sm text-gray-500">₹{item.price} × {item.quantity}</p>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="text-right mt-4 font-bold text-xl text-green-800">Total: ₹{total}</div>
          <div className="flex justify-between mt-6">
            <button
              onClick={clearCart}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-xl"
            >
              Clear Cart
            </button>
            <RazorpayButton amount={total} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
