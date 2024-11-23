import React, { useState, useEffect } from 'react';
import './AssignCourse.css';

const AssignCourse = () => {
  const [request, setRequest] = useState({});
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [deadline, setDeadline] = useState('');

  useEffect(() => {
    // Call API to get request details
    const requestId = window.location.pathname.split('/').pop();
    const requestData = {
      id: requestId,
      managerName: 'Manager 1',
      trainingProgram: 'Training Program 1',
    };
    setRequest(requestData);

    // Call API to get employees
    const employeesData = [
      { id: 1, employeeName: 'Employee 1' },
      { id: 2, employeeName: 'Employee 2' },
    ];
    setEmployees(employeesData);
  }, []);

  const handleSelectEmployee = (employeeId) => {
    const selectedEmployee = employees.find((employee) => employee.id === employeeId);
    setSelectedEmployees((prevEmployees) => [...prevEmployees, selectedEmployee]);
  };

  const handleAssignCourse = () => {
    // Call API to assign course to employees
    console.log('Course assigned to employees');
    console.log('Selected Employees:', selectedEmployees);
    console.log('Deadline:', deadline);
  };

  return (
    <div className="assign-course-container">
      <h1>Assign Course to Employees</h1>
      <div className="request-details">
        <h2>Request Details</h2>
        <p>Manager Name: {request.managerName}</p>
        <p>Training Program: {request.trainingProgram}</p>
      </div>
      <div className="employees-list">
        <h2>Employees List</h2>
        <ul>
          {employees.map((employee) => (
            <li key={employee.id}>
              <input type="checkbox" onChange={() => handleSelectEmployee(employee.id)} />
              <span>{employee.employeeName}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="assign-course-form">
        <h2>Assign Course Form</h2>
        <form>
          <label>Deadline:</label>
          <input type="date" value={deadline} onChange={(event) => setDeadline(event.target.value)} />
          <br />
          <button type="button" onClick={handleAssignCourse}>
            Assign Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssignCourse;