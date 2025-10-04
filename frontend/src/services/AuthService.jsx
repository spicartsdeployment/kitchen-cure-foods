import { api } from "../api";

export const getUser = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    console.log("get user api response: ", response);

    return response.data;
  } catch (error) {
    throw error.response?.data.detail;
  }
};

export const createUser = async (
  userName,
  email,
  password,
  phone,
  dob,
  gender
) => {
  try {
    const response = await api.post("/users/create", {
      userName,
      email,
      password,
      phone,
      dob,
      gender,
    });
    console.log("create api response: ", response);

    return response.data;
  } catch (error) {
    throw error.response?.data.detail;
  }
};

export const updateUser = async (id, formData) => {
  try {
    const response = await api.put(`/users/update/${id}`, formData);
    console.log("update api response: ", response);
    return response.data;
  } catch (error) {
    throw error.response?.data.detail;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/users/login", { email, password });
    console.log("login api response: ", response);

    if (response.data?.access_token) {
      localStorage.setItem("authToken", response.data.access_token);
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

export const logoutUser = () => {
  localStorage.removeItem("authToken");
  window.location.href = "/login"; // redirect to login page
};

export const get_me = async () => {
  try {
    const accessToken = localStorage.getItem("authToken");
    const response = await api.get("/users/me", { accessToken });
    console.log("me api response: ", response);

    if (response.data?.access_token) {
      localStorage.setItem("authToken", response.data.access_token);
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

export const resetPassword = async ({ email, dob, new_password }) => {
  try {
    const response = await api.post(`/users/reset-password`, {
      email,
      dob,
      new_password,
    });
    console.log("reset api response: ", response);
    return response.data;
  } catch (error) {
    throw error.response?.data.detail;
  }
};
