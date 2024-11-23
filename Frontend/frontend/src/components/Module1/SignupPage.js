import React, { useState } from 'react';
import './styles.css';

const SignupPage = ({ onSignupSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'employee',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Real-time validation for specific fields
    switch (name) {
      case 'name':
        setErrors((prev) => ({
          ...prev,
          name: value ? '' : 'Name is required',
        }));
        break;
      case 'email':
        setErrors((prev) => ({
          ...prev,
          email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email address',
        }));
        break;
      case 'password':
        setErrors((prev) => ({
          ...prev,
          password: value.length >= 6 ? '' : 'Password must be at least 6 characters long',
        }));
        break;
      case 'confirmPassword':
        setErrors((prev) => ({
          ...prev,
          confirmPassword: value === formData.password ? '' : 'Passwords do not match',
        }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Final validation checks
    const finalErrors = {};
    if (!formData.name) finalErrors.name = 'Name is required';
    if (!formData.email) finalErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) finalErrors.email = 'Invalid email address';
    if (formData.password.length < 6) finalErrors.password = 'Password must be at least 6 characters long';
    if (formData.password !== formData.confirmPassword) finalErrors.confirmPassword = 'Passwords do not match';
    setErrors(finalErrors);

    if (Object.keys(finalErrors).length === 0) {
      console.log("Signup Data:", formData);
      // After successful signup, trigger the onSignupSuccess handler
      onSignupSuccess(formData.role);  // Pass role to parent component
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', textAlign: 'left' }}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label>User Name:</label>
        <input type="text" name="name" required value={formData.name} onChange={handleChange} />
        {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}

        <label>Email:</label>
        <input type="email" name="email" required value={formData.email} onChange={handleChange} />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

        <label>Create Password:</label>
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

        <label>Confirm Password:</label>
        <input
          type={showPassword ? 'text' : 'password'}
          name="confirmPassword"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword}</p>}

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

        <label>Role:</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
        </select>

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default SignupPage;
