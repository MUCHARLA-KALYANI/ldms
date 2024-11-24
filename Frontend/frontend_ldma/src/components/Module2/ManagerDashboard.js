import React, { useState, useEffect } from 'react';
import './ManagerDashboard.css';
import TrainingRequestForm from './TrainingRequestForm';

const ManagerDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const username = localStorage.getItem('Username');
  console.log('username from manager',username);
  useEffect(() => {
    const userId = localStorage.getItem('ID');
    if (!userId) {
      alert('User ID is missing!');
      return;
    }

    const fetchRequests = async () => {
      const token = localStorage.getItem('token');

      
      if (!token) {
        alert('Unauthorized access. Please log in again.');
        return;
      }

      try {
        const response = await fetch(`http://localhost:8096/api/trainingRequests/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
             'Content-Type': 'application/json'
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch requests');
        }

        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, []);

 
 


  const handleCreateRequest = () => {
    setShowForm(true);
  };

  // const handleViewRequest = (id) => {
  //   // Call API to view request
  //   console.log(`View request ${id}`);
  // };

  return (
    <div className="manager-dashboard-container">
      <nav className="nav-bar">
        <span>Learning Hub</span>
        <span>Hey {username}</span>
        <i className="fa fa-user" aria-hidden="true"></i>
      </nav>
      <div className="request-summary">
        <h2>Request Summary</h2>
        <p>Total Requests: {requests.length}</p>
        <p>Completed Requests: {requests.filter((request) => request.status === 'COMPLETED').length}</p>
        <p>Pending Requests: {requests.filter((request) => request.status === 'PENDING').length}</p>
      </div>
      <button className="create-request-button" onClick={handleCreateRequest}>
        CREATE REQUEST
      </button>
      {showForm && <TrainingRequestForm />}
      <table className="requests-table">
        <thead>
          <tr>
            <th>Training Program</th>
            <th>Position</th>
            <th>Status</th>
            <th>Created Date</th>
            {/* <th>Action</th> */}
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.courseName}</td>
              <td>{request.position}</td>
              <td>{request.status}</td>
              <td>{request.createdDate}</td>
              {/* <td>
                <button className="view-button" onClick={() => handleViewRequest(request.id)}>
                  View
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerDashboard;