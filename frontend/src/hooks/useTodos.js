import { useState, useEffect } from "react";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "../services/todos";

const useTodos = () => {
  const [todos, setTodos] = useState([]);

  const loadTodos = async () => {
    const res = await fetchTodos();
    setTodos(res.data);
  };

  const addTodo = async (params) => {
    await createTodo(params);
    loadTodos();
  };

  const toggleTodo = async (id, completed) => {
    await updateTodo(id, { completed: !completed });
    loadTodos();
  };

  const removeTodo = async (id) => {
    await deleteTodo(id);
    loadTodos();
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return { todos, addTodo, toggleTodo, removeTodo };
};

export default useTodos;
