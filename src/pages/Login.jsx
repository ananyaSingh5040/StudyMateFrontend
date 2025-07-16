import { useState } from 'react';
import './Auth.css';
  import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {

const navigate = useNavigate();
useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) navigate("/");
}, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })  // make sure email & password are in your component state
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Login failed");
    }

    // Save token to localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data.user._id);

    toast.success("Login successful!");
    navigate("/");

  } catch (err) {
    toast.error(err.message || "Something went wrong");
  }
};
  return (
    <div className="auth-page">
    <div className="auth-container">
      <h2>Login to StudyMate</h2>
      <form className="auth-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <p>
          Don’t have an account? <a href="/signup">Sign up</a>
        </p>
      </form>
    </div>
    </div>
  );
}

export default Login;
