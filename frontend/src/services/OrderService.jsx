import { api } from "../api";

export const getOrdersByEmail = async (email) => {
  try {
    const response = await api.get(`/orders/getOrdersByEmail/${email}`);
    console.log("getOrdersByEmail api response: ", response);

    return response.data;
  } catch (error) {
    throw error.response?.data.detail;
  }
};

export const downloadOrderPdf = async (order_id) => {
  try {
    const response = await api.get(`/orders/download/${order_id}`, {
      responseType: "blob",
      headers: {
        Accept: "application/pdf",
      },
    });
    console.log("downloadOrderPdf api response: ", response);

    return response;
  } catch (error) {
    console.error("Error in downloadOrderPdf:", error);
    throw error.response?.data?.detail || "Failed to download PDF.";
  }
};
