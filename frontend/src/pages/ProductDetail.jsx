import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CartContext } from "../context/CartContext";
import { getProductById } from "../services/ProductService";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        console.log("Fetched product data: ", data);
        setProduct(data?.product);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product)
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600">
        Loading product details...
      </div>
    );

  const handleAddToCart = () => {
    if (quantity === 0) setQuantity(1);
    addToCart(product);
  };

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => Math.max(q - 1, 0));

  const sliderSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="min-h-screen p-12">
      <div className="max-w-6xl container bg-gray-50 mx-auto mt-8 px-8 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Image Carousel */}
        <div className="flex flex-col items-center">
          <Slider {...sliderSettings} className="w-full">
            {product.images?.map((img, idx) => (
              <div key={idx} className="flex justify-center">
                <img
                  src={img || "src/assets/placeholder-image.png"}
                  alt={product.name}
                  className="max-h-[500px] object-contain rounded-xl"
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-medium mb-3">{product.name}</h2>

            <p className="font-light text-red-700 mb-3 text-justify leading-relaxed">
              {product.caption}
            </p>
            <p className="mt-2 mb-2">
              <span className="text-yellow-500 text-2xl mr-1">★</span>
              <span className="text-md font-medium mr-1">{product.rating}</span>
              <span className="text-sm font-light text-gray-500">
                ({product.reviews}) Reviews
              </span>
            </p>

            <h2 className="text-xl font-semibold py-4">
              MRP (Incl. of Taxes)
              <span>
                <br /> Rs. {product.price}
              </span>
            </h2>
            <h4 className="text-lg font-light py-4 text-gray-500">
              Quantity: {product.quantity}g
            </h4>

            <h2 className="text-lg font-medium">Description</h2>
            <p className="font-light text-gray-700 mb-6 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Add to Cart Section */}
          <div className="flex flex-col space-y-4">
            {quantity === 0 ? (
              <button
                onClick={handleAddToCart}
                className="bg-green-700 hover:bg-green-800 text-white py-3 px-6 rounded-lg transition text-lg font-medium"
              >
                Add to Cart
              </button>
            ) : (
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={decreaseQty}
                  className="bg-green-700 text-white rounded-full w-10 h-10 text-lg"
                >
                  -
                </button>
                <span className="text-xl font-semibold">{quantity}</span>
                <button
                  onClick={increaseQty}
                  className="bg-green-700 text-white rounded-full w-10 h-10 text-lg"
                >
                  +
                </button>
              </div>
            )}

            <button
              onClick={() => {
                handleAddToCart();
                navigate("/cart");
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg transition text-lg font-medium"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
