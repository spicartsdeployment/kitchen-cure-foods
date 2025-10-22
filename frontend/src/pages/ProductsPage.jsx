import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const getProductsData = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProductsData();
  }, []);

  return (
    <div className="min-h-screen p-12" style={{ backgroundColor: "#f8fff8" }}>
      <div className="container mx-auto text-center px-8 py-8">
        <h2 className="text-3xl font-semibold mt-12">Our Products</h2>
        <p className="font-light mt-4 px-12">
          Discover our extensive selection of wholesome and flavorful food
          products, carefully crafted to nourish your body and delight your
          taste buds. From organic snacks and fresh ingredients to nutritious
          pantry staples, we bring you a variety of options that make healthy
          eating both easy and enjoyable. Explore our collection and elevate
          your meals with products that combine quality, taste, and wellness.
        </p>
      </div>
      <div className="container mx-auto bg-white border border-gray-200 rounded-3xl p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAdd={() => addToCart(product)}
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col justify-center items-center py-8">
            <img
              src="/src/assets/no-products-available.png"
              alt="no-products-available"
              className="w-30 h-auto mb-4"
            />
            <h2 className="text-2xl text-center text-gray-600">
              Oops! No products available.
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
