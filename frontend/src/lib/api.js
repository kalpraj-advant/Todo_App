import axios from "axios";

const api = axios.create({
  baseURL: "https://todo-ylml.onrender.com/api/v1", // update if needed
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// Add response interceptor to handle unauthorized responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token without reloading
      localStorage.removeItem("token");
      // Let the component handle the redirect
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default api;
