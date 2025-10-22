import { api } from "../api";

export const getProducts = async () => {
  try {
    const response = await api.get("/products/getProducts");
    console.log("getProducts api response: ", response);

    return response.data;
  } catch (error) {
    throw error.response?.data.detail;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    console.log("getProductById api response: ", response);

    return response.data;
  } catch (error) {
    throw error.response?.data.detail;
  }
};

export const createOrder = async (amount) => {
  const res = await api.post(`${BASE_URL}/products/create-order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  });
  return res.json();
};
