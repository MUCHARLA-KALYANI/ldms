import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [requests, setRequests] = useState([]);
  const [employees, setEmployees] = useState([]);

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
        const response = await fetch('http://localhost:8096/api/trainingRequests/all', {
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

  return (
    <div className="admin-dashboard-container">
      <nav className="nav-bar">
        <span>Learning Hub</span>
        <span>Hey Admin!</span>
        <i className="fa fa-user" aria-hidden="true"></i>
      </nav>
      <div className="dashboard-details">
        <h2>Dashboard</h2>
        <p>No of Courses Created: {courses.length}</p>
        <p>No of Requests: {requests.length}</p>
        <p>No of Employees: {employees.length}</p>
      </div>
      <div className="requests-tables">
        <h2>Pending Requests</h2>
        <table>
          <thead>
            <tr>
              <th>Serial No</th>
              <th>Manager Name</th>
              <th>Training Program</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr key={request.id}>
                <td>{index + 1}</td>
                <td>{request.managerName}</td>
                <td>{request.trainingProgram}</td>
                <td>
                  <Link to={`/assign-course/${request.id}`}>
                    <button>View</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2>Completed Requests</h2>
        <table>
          <thead>
            <tr>
              <th>Serial No</th>
              <th>Manager Name</th>
              <th>Training Program</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr key={request.id}>
                <td>{index + 1}</td>
                <td>{request.managerName}</td>
                <td>{request.trainingProgram}</td>
                <td>
                  <Link to={`/assign-course/${request.id}`}>
                    <button>View</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
</div>
  );
};

export default AdminDashboard;    