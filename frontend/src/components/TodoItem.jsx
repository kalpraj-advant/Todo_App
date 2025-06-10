
function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className="flex flex-col p-4 border rounded shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className={`text-lg font-medium ${todo.completed ? "line-through text-gray-400" : ""}`}>
          {todo.title}
        </h3>
        <div className="space-x-2">
          <button 
            onClick={() => onToggle(todo.id, todo.completed)} 
            className="text-green-600 hover:text-green-700 cursor-pointer text-sm font-medium border p-1 rounded transition-colors"
          >
            {todo.completed ? "Incomplete" : "Complete"}
          </button>
          <button 
            onClick={() => onDelete(todo.id)} 
            className="text-red-600 hover:text-red-700 cursor-pointer text-sm font-medium border p-1 rounded transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
      <p className={`text-gray-600 ${todo.completed ? "line-through text-gray-400" : ""}`}>
        {todo.description || "No description"}
      </p>
    </li>
  );
}

export default TodoItem;
