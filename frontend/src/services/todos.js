import api from "../lib/api";

export const fetchTodos = () => api.get("/todos/");
export const createTodo = (data) => api.post("/todos/", data);
export const updateTodo = (id, data) => api.put(`/todos/${id}`, data);
export const deleteTodo = (id) => api.delete(`/todos/${id}`);
