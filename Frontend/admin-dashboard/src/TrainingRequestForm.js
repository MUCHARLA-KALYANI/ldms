import React, { useState } from 'react';

function TrainingRequestForm({ onSubmit, employees }) {
  const [formData, setFormData] = useState({
    employeeId: '',
    firstName: '',
    courseRequested: '',
    jobDescription: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <select name="employeeId" value={formData.employeeId} onChange={handleChange}>
        <option value="">Select Employee</option>
        {employees.map((emp) => (
          <option key={emp.id} value={emp.id}>
            {emp.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="courseRequested"
        placeholder="Course Requested"
        value={formData.courseRequested}
        onChange={handleChange}
      />
      <textarea
        name="jobDescription"
        placeholder="Job Description"
        value={formData.jobDescription}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default TrainingRequestForm;
