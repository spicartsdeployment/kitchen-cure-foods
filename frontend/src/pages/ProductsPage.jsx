import React from "react";

const ProductsPage = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-50">
      <img
        alt="page-under-construction"
        src="src/assets/page-under-construction.jpg"
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-10 bg-black bg-opacity-50 px-6 py-2 rounded">
        <h3 className="text-center text-2xl text-white">
          Page is under development...
        </h3>
      </div>
    </div>
  );
};

export default ProductsPage;
