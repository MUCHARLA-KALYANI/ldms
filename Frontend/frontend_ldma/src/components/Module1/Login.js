import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') setUsername(value);
    if (name === 'password') setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8096/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const { accessToken, roles, id, username } = data;

        // Save the JWT token in localStorage with 'Bearer ' prefix
        localStorage.setItem('token', `Bearer ${accessToken}`);
        console.log('Token from localStorage:', localStorage.getItem('token'));
        localStorage.setItem('role', roles[0]); // Save the first role (you can add more logic if there are multiple roles)
        console.log('Role from backend:', roles[0]); 
        localStorage.setItem('ID',id);
        localStorage.setItem('Username',username);
        console.log(username);
        console.log(id); 

        // Redirect based on the user's role
        if (roles.includes('ROLE_MANAGER')) {
          console.log('Navigating to manager dashboard');
          navigate('/manager-dashboard');
        } else if (roles.includes('ROLE_ADMIN')) {
          console.log('Navigating to admin dashboard');
          navigate('/admin-dashboard');
        } else if (roles.includes('ROLE_USER')) {
          console.log('Navigating to user dashboard');
          navigate('/user');
        } else {
          console.error('Unknown role:', roles);
          setErrorMessage('Unknown role. Contact support.');
        }        
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Login failed');
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1 style={{ color: '#6a11cb' }}>Login</h1>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleInputChange}
        />
        <br />
        <label>Password:</label>
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={password}
          onChange={handleInputChange}
        />
        <div className="show-password">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
          />
          <label>Show Password</label>
        </div>
        <br />
        <div className="button-container">
          <button type="submit">Login</button>
          <button
            type="button"
            onClick={() => {
              setUsername('');
              setPassword('');
              setErrorMessage('');
            }}
          >
            Reset
          </button>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </form>
    </>
  );
};

export default Login;
