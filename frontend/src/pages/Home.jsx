import { useState } from "react";
import useTodos from "../hooks/useTodos";

function Home() {
  const { todos, addTodo, toggleTodo, removeTodo } = useTodos();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState("all");

  const handleAdd = () => {
    if (title.trim()) {
      addTodo({ title, description });
      setTitle("");
      setDescription("");
    }
  };

  const filteredTodos =
    filter === "all"
      ? todos
      : filter === "active"
      ? todos.filter((t) => !t.completed)
      : todos.filter((t) => t.completed);

  const totalTasks = todos.length;
  const completedTasks = todos.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-[#10182A] text-white pt-10 m-0">
      {/* Top Bar (Navbar is separate) */}
      <div className="max-w-6xl mx-auto py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Stats */}
          <div className="flex flex-col gap-6 w-full md:w-1/4">
            <div className="bg-[#141B2D] rounded-xl p-6 flex flex-col items-start shadow">
              <span className="text-lg text-gray-300">Total Tasks</span>
              <span className="text-4xl font-bold mt-2">{totalTasks}</span>
            </div>
            <div className="bg-[#141B2D] rounded-xl p-6 flex flex-col items-start shadow">
              <span className="text-lg text-gray-300">Completed</span>
              <span className="text-4xl font-bold mt-2 text-green-400">{completedTasks}</span>
            </div>
            {/* Filter Tasks */}
            <div className="bg-[#141B2D] rounded-xl p-6 shadow">
              <span className="text-lg font-semibold mb-4 block">Filter Tasks</span>
              <div className="flex flex-col gap-2">
                <button onClick={() => setFilter("all")} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-left cursor-pointer ${filter === "all" ? "bg-blue-600 text-white" : "bg-[#10182A] text-gray-200"}`}> <span className="material-icons">list</span> All Tasks </button>
                <button onClick={() => setFilter("active")} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-left cursor-pointer ${filter === "active" ? "bg-blue-600 text-white" : "bg-[#10182A] text-gray-200"}`}> <span className="material-icons">schedule</span> Active </button>
                <button onClick={() => setFilter("completed")} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-left cursor-pointer ${filter === "completed" ? "bg-blue-600 text-white" : "bg-[#10182A] text-gray-200"}`}> <span className="material-icons">check</span> Completed </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Add New Task */}
            <div className="bg-[#141B2D] rounded-xl p-8 shadow">
              <span className="text-2xl font-bold mb-6 block">Add New Task</span>
              <div className="space-y-4 grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter task title"
                    className="w-full bg-[#10182A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter task description"
                    rows="3"
                    className="w-full bg-[#10182A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-center items-center">
                  <button onClick={handleAdd} className="w-full h-10 bg-blue-600 text-white font-semibold px-6 py-1 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer mt-3 overflow-hidden">
                  + Add Task
                  </button>
                </div>
              </div>
            </div>

            {/* Task List */}
            <div className="bg-[#141B2D] rounded-xl p-8 shadow">
              <span className="text-2xl font-bold mb-6 block">Your Tasks</span>
              <ul className="divide-y divide-gray-800">
                {filteredTodos.length === 0 ? (
                  <li className="py-8 text-center text-gray-400">No tasks found.</li>
                ) : (
                  filteredTodos.map((todo) => (
                    <li key={todo.id} className="py-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <button
                            onClick={() => toggleTodo(todo.id, todo.completed)}
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 cursor-pointer ${
                              todo.completed ? "border-green-400 bg-green-400" : "border-gray-500"
                            }`}
                          >
                            {todo.completed && (
                              <svg
                                className="w-4 h-4 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </button>
                          <div>
                            <h3 className={`text-lg font-semibold ${todo.completed ? "line-through text-gray-400" : "text-white"}`}>
                              {todo.title}
                            </h3>
                            <p className={`text-sm mt-1 ${todo.completed ? "text-gray-500" : "text-gray-300"}`}>
                              {todo.description || "No description"}
                            </p>
                            
                          </div>
                        </div>
                        <button
                          onClick={() => removeTodo(todo.id)}
                          className="text-red-400 hover:text-red-600 text-sm font-medium px-3 py-1 rounded transition-colors cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
