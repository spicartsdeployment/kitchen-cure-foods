import React, { createContext, useState, useEffect, useMemo } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Persist cart in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add new item or increase if it exists
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p._id === product._id);
      if (existing) {
        return prev.map((p) =>
          p._id === product._id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Increase quantity
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    );
  };

  // Decrease quantity
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item._id === id
            ? { ...item, quantity: Math.max((item.quantity || 1) - 1, 0) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove entire item
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  // Clear entire cart
  const clearCart = () => setCart([]);

  // Cart calculations (memoized for performance)
  const { subtotal, tax, total, cartCount } = useMemo(() => {
    const subtotal = cart.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );
    const tax = subtotal * 0.05; // 5% tax
    const total = subtotal + tax;
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    return { subtotal, tax, total, cartCount };
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQty,
        decreaseQty,
        subtotal,
        tax,
        total,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
