import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [confirmPassword, setConfirmPassword] = useState(""); 
  function handleRegisterSubmit(e) {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(!name.trim()||!email.trim()||!password.trim()||!confirmPassword.trim()){
      alert("Please fill in all fields.");
      return;
    }
    if(name.trim().length<3){
      alert("Name must be at least 3 characters long.");
      return;
    }
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if(!passwordRegex.test(password)){
      alert("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
      return;
    }
    if(password!==confirmPassword){
      alert("Passwords do not match.");
      return;
    }
  }
  return (
    <div>
      <div>
        <h1>Create Account</h1>
        <p>Create your account to start managing your ledger</p>
        <form onSubmit={handleRegisterSubmit}>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)} />
          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
          <label htmlFor="password">Password</label>
          <input id="password" type="password" placeholder='Password' value={password} onChange = {(e)=>setPassword(e.target.value)}/>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input id="confirmPassword" type="password" placeholder='Confirm Password' value={confirmPassword} onChange = {(e)=>setConfirmPassword(e.target.value)}/>
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? {" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
