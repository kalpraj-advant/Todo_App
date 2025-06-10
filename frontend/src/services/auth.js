import api from "../lib/api";

export const loginUser = (formData) => api.post("/auth/login", formData);
export const registerUser = (data) => api.post("/auth/register", data);
