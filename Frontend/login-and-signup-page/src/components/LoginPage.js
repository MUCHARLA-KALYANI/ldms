import React, { useState } from 'react';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '', role: 'employee' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    // Add login validation here
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', textAlign: 'left' }}>
      <center>
        <h2>Login</h2>
      </center>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" name="email" required value={formData.email} onChange={handleChange} />

        <label>Password:</label>
        <input type="password" name="password" required value={formData.password} onChange={handleChange} />

        <label>Login as:</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
          <option value="admin">Manager</option>
        </select>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
