import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [requests, setRequests] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Call API to get courses, requests and employees
    const coursesData = [
      { id: 1, courseName: 'Course 1' },
      { id: 2, courseName: 'Course 2' },
    ];
    setCourses(coursesData);

    const requestsData = [
      { id: 1, managerName: 'Manager 1', trainingProgram: 'Training Program 1' },
      { id: 2, managerName: 'Manager 2', trainingProgram: 'Training Program 2' },
    ];
    setRequests(requestsData);

    const employeesData = [
      { id: 1, employeeName: 'Employee 1' },
      { id: 2, employeeName: 'Employee 2' },
    ];
    setEmployees(employeesData);
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