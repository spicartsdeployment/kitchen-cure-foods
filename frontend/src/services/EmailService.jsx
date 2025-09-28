import { api } from "../api";

export const subscribe = async (email) => {
  try {
    const response = await api.post(`/email/subscribe/${email}`);
    console.log("subscribe api response: ", response);
    return response.data;
  } catch (error) {
    throw error.response?.data.detail;
  }
};

export const sendEnquiry = async (name, email, message) => {
  try {
    const response = await api.post("/email/send-enquiry/", {
      name,
      email,
      message,
    });
    console.log("sendEnquiry api response: ", response);

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Request failed" };
  }
};
