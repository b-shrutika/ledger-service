import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [name, setName] = userState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function handleLogin(e) {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !password.trim()) {
    alert("Please fill in all fields.");
    return;
}
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
  }
  return (
    <div>
      <div>
        <h1>Login</h1>
        <p>Welcome back! Sign in to continue.</p>
        <form onSubmit={handleLogin}>
          
          <label htmlFor="name">Full Name</label>
          <input id="name" type="text" placeholder='Full Name' value={name} onChange={(e) => setName(e.target.value)} />
          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="password">Password</label>
          <input id="password" type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">
            Login
          </button>
        </form>
        <p>
          Forget password? {" "}
          {/* <Link to="/register">Sign up</Link> */}
        </p>
        <p>
          Don't have an account? {" "}
          <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
