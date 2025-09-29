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

export const sendEmailMessage = async (
  name,
  email,
  phone,
  message,
  category,
  subject
) => {
  try {
    const response = await api.post("/email/send-message/", {
      name,
      email,
      phone,
      message,
      category,
      subject,
    });

    return response;
  } catch (error) {
    throw error.response?.data || { message: "Request failed" };
  }
};

export const scheduleAppointment = async (name, email, phone, message) => {
  try {
    const response = await api.post("/email/schedule-appointment/", {
      name,
      email,
      phone,
      message,
    });

    return response;
  } catch (error) {
    throw error.response?.data || { message: "Request failed" };
  }
};
