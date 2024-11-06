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
  
  const [errors, setErrors] = useState({});

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
      case 'phone':
        setErrors((prev) => ({
          ...prev,
          phone: /^[0-9]{10}$/.test(value) ? '' : 'Phone number must be 10 digits',
        }));
        break;
      case 'department':
        setErrors((prev) => ({
          ...prev,
          department: value ? '' : 'Department is required',
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
    if (formData.phone && !/^[0-9]{10}$/.test(formData.phone)) finalErrors.phone = 'Phone number must be 10 digits';
    if (!formData.department) finalErrors.department = 'Department is required';
    setErrors(finalErrors);

    if (Object.keys(finalErrors).length === 0) {
      console.log("Signup Data:", formData);
      // Perform signup request here (e.g., send data to API)
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', textAlign: 'left' }}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" required value={formData.name} onChange={handleChange} />
        {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}

        <label>Email:</label>
        <input type="email" name="email" required value={formData.email} onChange={handleChange} />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

        <label>Create Password:</label>
        <input type="password" name="password" required value={formData.password} onChange={handleChange} />
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

        <label>Confirm Password:</label>
        <input type="password" name="confirmPassword" required value={formData.confirmPassword} onChange={handleChange} />
        {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword}</p>}

        <label>Gender:</label>
        <select name="gender" required value={formData.gender} onChange={handleChange}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <label>Phone Number:</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
        {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}

        <label>Role:</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
        </select>

        <label>Department:</label>
        <input type="text" name="department" required value={formData.department} onChange={handleChange} />
        {errors.department && <p style={{ color: 'red' }}>{errors.department}</p>}

        <label>Employee ID:</label>
        <input type="text" name="employeeId" value={formData.employeeId} onChange={handleChange} />

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default SignupPage;
