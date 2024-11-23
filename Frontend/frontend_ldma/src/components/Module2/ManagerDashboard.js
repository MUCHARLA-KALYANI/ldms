import React, { useState, useEffect } from 'react';
import './ManagerDashboard.css';
import TrainingRequestForm from './TrainingRequestForm';

const ManagerDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Call API to get requests
    const requestsData = [
      { id: 1, courseName: 'Course 1', position: 'Position 1', status: 'Pending', createdDate: '2024-11-23' },
      { id: 2, courseName: 'Course 2', position: 'Position 2', status: 'Completed', createdDate: '2024-11-22' },
    ];
    setRequests(requestsData);
  }, []);

  const handleCreateRequest = () => {
    setShowForm(true);
  };

  const handleViewRequest = (id) => {
    // Call API to view request
    console.log(`View request ${id}`);
  };

  return (
    <div className="manager-dashboard-container">
      <nav className="nav-bar">
        <span>Learning Hub</span>
        <span>Hey Manager!</span>
        <i className="fa fa-user" aria-hidden="true"></i>
      </nav>
      <div className="request-summary">
        <h2>Request Summary</h2>
        <p>Total Requests: {requests.length}</p>
        <p>Completed Requests: {requests.filter((request) => request.status === 'Completed').length}</p>
        <p>Pending Requests: {requests.filter((request) => request.status === 'Pending').length}</p>
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.courseName}</td>
              <td>{request.position}</td>
              <td>{request.status}</td>
              <td>{request.createdDate}</td>
              <td>
                <button className="view-button" onClick={() => handleViewRequest(request.id)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerDashboard;