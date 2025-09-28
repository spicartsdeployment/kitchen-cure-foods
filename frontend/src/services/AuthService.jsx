import { api } from "../api";

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
    // const response = await mockLogin({ email, password });

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
    // const response = await mockLogin({ email, password });

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
    // const response = await mockLogin({ email, password });

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

export const subscribe = async (email) => {
  try {
    const response = await api.post(`/users/subscribe/${email}`);
    console.log("subscribe api response: ", response);
    return response.data;
  } catch (error) {
    throw error.response?.data.detail;
  }
};

// Fake JWT generator (dev purpose only)
const generateFakeJWT = (payload) => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = btoa(
    JSON.stringify({
      ...payload,
      exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour expiry
    })
  );
  return `${header}.${body}.fake-signature`;
};
