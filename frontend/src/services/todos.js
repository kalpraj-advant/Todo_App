import api from "../lib/api";

export const fetchTodos = () => api.get("/todos/");
export const createTodo = (params) => api.post("/todos/", null, { params });
export const updateTodo = (id, params) => api.put(`/todos/${id}`, null, { params });
export const deleteTodo = (id) => api.delete(`/todos/${id}`);
