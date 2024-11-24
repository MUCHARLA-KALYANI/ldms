import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';

const Signup = ({ handleRole }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignup = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch('http://localhost:8096/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, role: [role.toLowerCase()] }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Signup successful:', data);
        setSuccessMessage(data.message || 'Signup successful!');
        setErrorMessage('');
        handleRole(role);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Signup failed!');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setErrorMessage('An unexpected error occurred.');
      setSuccessMessage('');
    }
  };

  return (
    <>
      <form onSubmit={handleSignup}>
        <h1 style={{ color: '#6a11cb' }}>Sign Up</h1>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <br />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <br />
        <label>Password:</label>
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <div className="show-password">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={(event) => setShowPassword(event.target.checked)}
          />
          <label>Show Password</label>
        </div>
        <br />
        <label>Confirm Password:</label>
        <input
          type={showPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
        <br />
        <label>Role:</label>
        <select value={role} onChange={(event) => setRole(event.target.value)}>
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="Employee">Employee</option>
          <option value="Manager">Manager</option>
        </select>
        <br />
        <div className="button-container">
          <button type="submit">Sign Up</button>
          <button type="button" onClick={() => { setUsername(''); setEmail(''); setPassword(''); setConfirmPassword(''); setRole(''); }}>Reset</button>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </>
  );
};

export default Signup;
