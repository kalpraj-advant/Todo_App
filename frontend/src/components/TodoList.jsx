import { useState } from "react";
import TodoItem from "./TodoItem";
import useTodos from "../hooks/useTodos";

function TodoList() {
  const { todos, addTodo, toggleTodo, removeTodo } = useTodos();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = () => {
    if (title.trim()) {
      addTodo({ title, description });
      setTitle("");
      setDescription("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Todo List</h2>
      
      <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
        <div className="space-y-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows="3"
          />
        </div>
        <button
          onClick={handleAdd}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded cursor-pointer transition-colors"
        >
          Add Todo
        </button>
      </div>

      <div className="space-y-3">
        {todos.length === 0 ? (
          <p className="text-center text-gray-500">No todos.</p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={removeTodo}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TodoList;