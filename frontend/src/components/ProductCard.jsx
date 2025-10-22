import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, MinusCircle } from "lucide-react";

const ProductCard = ({ product, onAdd }) => {
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

  const truncateDesc = (text, limit = 60) =>
    text.length > limit ? text.substring(0, limit) + "..." : text;

  const handleAddToCart = (e) => {
    e.stopPropagation(); // prevent navigating to detail page
    if (quantity === 0) {
      setQuantity(1);
      onAdd(product);
    }
  };

  const increaseQty = (e) => {
    e.stopPropagation();
    setQuantity((q) => q + 1);
  };

  const decreaseQty = (e) => {
    e.stopPropagation();
    setQuantity((q) => Math.max(q - 1, 0));
  };

  return (
    <div className="border border-gray-300 rounded-2xl shadow hover:shadow-2xl transition duration-300 overflow-hidden">
      {/* Product Image */}
      <div className="relative cursor-pointer" onClick={handleCardClick}>
        <img
          src={product.images?.[0] || "src/assets/placeholder-image.png"}
          alt={product.name}
          className="w-full h-64 object-cover rounded-t-2xl"
        />
      </div>

      {/* Product Info */}
      <div className="px-6 py-4 text-center">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>

        <p className="font-light text-sm">
          {truncateDesc(product.description)}
        </p>
        <p className="mt-2 mb-2">
          <span className="text-yellow-500 text-2xl mr-1">★</span>
          <span className="text-md font-medium mr-1">4.75</span>
          <span className="text-sm font-light text-gray-500">
            (225) Reviews
          </span>
        </p>

        <div className="mt-3">
          <span className="text-red-700">Rs. {product.price}</span>
        </div>

        {/* Add to Cart or Quantity Controls */}
        {quantity === 0 ? (
          <button
            onClick={handleAddToCart}
            className="w-full mt-4 bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded-4xl transition cursor-pointer"
          >
            Add to Cart
          </button>
        ) : (
          <div className="mt-4 flex items-center justify-center space-x-3">
            <button onClick={decreaseQty}>
              <MinusCircle
                size={20}
                className="text-green-700 cursor-pointer"
              />
            </button>
            <span className="text-lg font-medium">{quantity}</span>
            <button onClick={increaseQty}>
              <PlusCircle size={20} className="text-green-700 cursor-pointer" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
