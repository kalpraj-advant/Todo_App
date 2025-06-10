import { useState } from "react";
import { registerUser } from "../../services/auth";

function Register() {
  const [form, setForm] = useState({ email: "", username: "", first_name: "", last_name: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(form);
    alert("User registered!");
  };

  return (
    <div className="max-w-sm p-6 mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {["email", "username", "first_name", "last_name", "password"].map((field) => (
          <input
            key={field}
            name={field}
            type={field === "password" ? "password" : "text"}
            placeholder={field}
            value={form[field]}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        ))}
        <button className="w-full p-2 bg-blue-500 cursor-pointer text-white rounded">Register</button>
      </form>
    </div>
  );
}

export default Register;
