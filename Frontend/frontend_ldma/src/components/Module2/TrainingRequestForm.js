import React, { useState } from 'react';
import './TrainingRequestForm.css';

const TrainingRequestForm = () => {
  const [username, setUsername] = useState('');
  const [courseName, setCourseName] = useState('');
  const [description, setDescription] = useState('');
  const [concepts, setConcepts] = useState('');
  const [duration, setDuration] = useState('');
  const [employeePosition, setEmployeePosition] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call API to submit training request
    console.log('Training request submitted');
  };

  return (
    <div className="training-request-container">
      <h1>Training Request Form</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label>Username:</label>
          <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
          <br />
          <label>Course Name:</label>
          <input type="text" value={courseName} onChange={(event) => setCourseName(event.target.value)} />
          <br />
          <label>Description:</label>
          <textarea value={description} onChange={(event) => setDescription(event.target.value)} />
          <br />
          <label>Concepts:</label>
          <textarea value={concepts} onChange={(event) => setConcepts(event.target.value)} />
          <br />
          <label>Duration:</label>
          <input type="text" value={duration} onChange={(event) => setDuration(event.target.value)} />
          <br />
          <label>Employee Position:</label>
          <input type="text" value={employeePosition} onChange={(event) => setEmployeePosition(event.target.value)} />
          <br />
          <button type="submit">Submit Request</button>
        </form>
      </div>
    </div>
  );
};

export default TrainingRequestForm;