import React, { useState } from 'react';
import './TrainingRequestForm.css';

const TrainingRequestForm = () => {
  // const [username, setUsername] = useState('');
  const [courseName, setCourseName] = useState('');
  const [description, setDescription] = useState('');
  const [concepts, setConcepts] = useState('');
  const [duration, setDuration] = useState('');
  const [position, setPosition] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Get the user ID from localStorage
    const userId = localStorage.getItem('ID');
      // Assuming 'id' is stored in localStorage
    
    if (!userId) {
      alert('User ID is missing!');
      return;
    }

    const token = localStorage.getItem('token');
      if (!token) {
        alert('Unauthorized access. Please log in again.');
        return;
      }

    // Create a request object to be sent to the backend
    const requestBody = {
      user: { id: userId },
      courseName,
      description,
      concepts,
      duration,
      position,
      status: 'Pending',  // You can set a default status or take it as input from the user
      createdDate: new Date(),  // Set the current date as createdDate
    };

    try {
      // Make the POST request to the backend API
      const response = await fetch('http://localhost:8096/api/trainingRequests/create', {
        method: 'POST',
        headers: 
        { Authorization: `Bearer ${token}` ,
        'Content-Type': 'application/json'},
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Training request submitted:', data);
        alert('Training request submitted successfully');
      } else {
        alert('Failed to submit the request');
      }
    } catch (error) {
      console.error('Error submitting training request:', error);
      alert('Error submitting the request');
    }
  };


  return (
    <div className="training-request-container">
      <h1>Training Request Form</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          {/* <label>Username:</label>
          <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
          <br /> */}
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
          <input type="text" value={position} onChange={(event) => setPosition(event.target.value)} />
          <br />
          <button type="submit">Submit Request</button>
        </form>
      </div>
    </div>
  );
};

export default TrainingRequestForm;