import React, { useState } from 'react';
import './styles.css';

const LoginPage = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({ email: '', password: '', role: 'employee' });
  const [errors, setErrors] = useState({}); // State to hold validation error messages
  const [apiError, setApiError] = useState(''); // For errors from API response if needed
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to validate the form data
  const validateForm = () => {
    const errors = {};

    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setApiError(''); // Clear any existing API error messages

    if (!validateForm()) return; // Stop submission if validation fails

    console.log("Login Data:", formData);

    // Assuming the login is successful, trigger the onLoginSuccess handler
    onLoginSuccess(formData.role);  // Pass role to parent component

    // If you were connecting to a backend, you would make an API call here
    // e.g., axios.post('/login', formData).then(response => onLoginSuccess()).catch(error => setApiError(error.message));
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', textAlign: 'left' }}>
      <center>
        <h2>Login</h2>
      </center>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

        <label>Password:</label>
        <input
          type={showPassword ? 'text' : 'password'} // Toggle password visibility
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

        {/* Show Password Checkbox */}
        <div className="password-toggle">
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)} // Toggle password visibility
          />
          <label htmlFor="showPassword">Show Password</label>
        </div>

        <label>Login as:</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
        </select>

        {apiError && <p style={{ color: 'red' }}>{apiError}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
