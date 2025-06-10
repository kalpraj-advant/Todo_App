import axios from "axios";

const api = axios.create({
  baseURL: "https://todo-ylml.onrender.com/api/v1",
});

export const setAuthToken = (token) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default api;
