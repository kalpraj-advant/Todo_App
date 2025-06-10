import { useState } from "react";
import { loginUser } from "../../services/auth";

function Login({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("username", form.username);
    data.append("password", form.password);
    const res = await loginUser(data);
    onLogin(res.data.access_token);
  };

  return (
    <div className="max-w-sm p-6 mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full p-2 border rounded" />
        <button className="w-full p-2 bg-blue-500 cursor-pointer text-white rounded">Login</button>
      </form>
    </div>
  );
}

export default Login;
