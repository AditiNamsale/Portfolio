import React, { useState } from 'react';
import './Login.css';

const Login = ({ setIsAdmin }) => {
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const adminPassword = 'admin'; // Replace 'admin' with your actual admin password
    if (password === adminPassword) {
      setIsAdmin(true);
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div className="login-form">
      <br />
      <h2>Admin Login</h2><br />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      /><br /><br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;