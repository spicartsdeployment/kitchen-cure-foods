import React, { useContext, useState, useRef, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Plus, Minus, Trash } from "lucide-react";

const MiniCart = () => {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    subtotal,
    cartCount,
  } = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCheckout = () => {
    setOpen(false);
    navigate("/cart"); // Navigate to full cart page if needed
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Cart Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="relative flex items-center space-x-1 p-2 hover:bg-gray-100 rounded-lg transition"
      >
        <ShoppingCart size={24} className="text-gray-700" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-green-700 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-50 animate-fade-in">
          <div className="p-4 max-h-96 overflow-y-auto">
            {cart.length === 0 ? (
              <p className="text-gray-500 text-sm text-center">
                Your cart is empty
              </p>
            ) : (
              <>
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-center mb-3 border-b border-gray-100 pb-2"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={
                          item.images?.[0] ||
                          item.image ||
                          "src/assets/placeholder-image.png"
                        }
                        alt={item.name}
                        className="w-12 h-12 rounded-md object-cover"
                      />
                      <div className="flex flex-col">
                        <p className="text-sm font-medium line-clamp-1">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          ₹{item.price} x {item.quantity}
                        </p>

                        {/* Quantity controls */}
                        <div className="w-fit mt-2 px-2 flex items-center justify-center font-semibold border-2 border-amber-400 rounded-full text-xs sm:text-sm">
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
                      className="text-red-700 text-xs hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t px-4 py-3">
              <div className="flex justify-between text-sm font-semibold">
                <span>SubTotal:</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full mt-3 bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg text-sm font-medium transition"
              >
                View Cart
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MiniCart;
