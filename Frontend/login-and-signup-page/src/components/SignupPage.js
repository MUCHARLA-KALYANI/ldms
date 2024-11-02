import React, { useState } from 'react';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    phone: '',
    role: 'employee',
    department: '',
    employeeId: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log("Signup Data:", formData);
    // Add signup validation here
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', textAlign: 'left' }}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" required value={formData.name} onChange={handleChange} />

        <label>Email:</label>
        <input type="email" name="email" required value={formData.email} onChange={handleChange} />

        <label>Create Password:</label>
        <input type="password" name="password" required value={formData.password} onChange={handleChange} />

        <label>Confirm Password:</label>
        <input type="password" name="confirmPassword" required value={formData.confirmPassword} onChange={handleChange} />

        <label>Gender:</label>
        <select name="gender" required value={formData.gender} onChange={handleChange}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <label>Phone Number:</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />

        <label>Role:</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
          <option value="admin">Manager</option>
        </select>

        <label>Department:</label>
        <input type="text" name="department" required value={formData.department} onChange={handleChange} />

        <label>Employee ID:</label>
        <input type="text" name="employeeId" value={formData.employeeId} onChange={handleChange} />

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default SignupPage;
