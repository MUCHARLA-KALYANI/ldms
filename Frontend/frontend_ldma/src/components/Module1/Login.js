import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = ({ handleRole }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    // Call API to login
    console.log('Login button clicked');
    handleRole('Manager'); // or 'Employee' or 'Admin'
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <div className="form-container">
        <form onSubmit={handleLogin}>
          <label>Username:</label>
          <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
          <br />
          <label>Password:</label>
          <input type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} />
          <div className="show-password">
            <input type="checkbox" checked={showPassword} onChange={(event) => setShowPassword(event.target.checked)} />
            <label>Show Password</label>
          </div>
          <br />
          <div className="button-container">
            <button type="submit">Login</button>
            <button type="button">Reset</button>
          </div>
        </form>
      </div>
      <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
};

export default Login;