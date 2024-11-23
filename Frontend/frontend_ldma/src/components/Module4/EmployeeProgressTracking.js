import React, { useState, useEffect } from 'react';
import './EmployeeProgressTracking.css';

const EmployeeProgressTracking = () => {
  const [employees, setEmployees] = useState([]);
  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState({});

  useEffect(() => {
    // Call API to get employees
    const employeesData = [
      { id: 1, name: 'Employee 1' },
      { id: 2, name: 'Employee 2' },
    ];
    setEmployees(employeesData);

    // Call API to get courses
    const coursesData = [
      { id: 1, name: 'Course 1' },
      { id: 2, name: 'Course 2' },
    ];
    setCourses(coursesData);

    // Call API to get progress
    const progressData = {
      'Employee 1': {
        'Course 1': 50,
        'Course 2': 30,
      },
      'Employee 2': {
        'Course 1': 70,
        'Course 2': 40,
      },
    };
    setProgress(progressData);
  }, []);

  const handleModifyCourse = (employeeId, courseId) => {
    // Call API to modify course
    console.log(`Modify course ${courseId} for employee ${employeeId}`);
  };

  const handleReassignCourse = (employeeId, courseId) => {
    // Call API to reassign course
    console.log(`Reassign course ${courseId} to employee ${employeeId}`);
  };

  const handleViewReport = (employeeId) => {
    // Call API to view report
    console.log(`View report for employee ${employeeId}`);
  };

  return (
    <div className="employee-progress-tracking-container">
      <h1>Employee Progress Tracking</h1>
      <table>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Course Name</th>
            <th>Progress</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>
                {courses.map((course) => (
                  <div key={course.id}>
                    {course.name} ({progress[employee.name][course.name]}%)
                  </div>
                ))}
              </td>
              <td>
                {courses.map((course) => (
                  <div key={course.id}>
                    <progress value={progress[employee.name][course.name]} max="100" />
                  </div>
                ))}
              </td>
              <td>
                {courses.map((course) => (
                  <div key={course.id}>
                    <button onClick={() => handleModifyCourse(employee.id, course.id)}>Modify Course</button>
                    <button onClick={() => handleReassignCourse(employee.id, course.id)}>Reassign Course</button>
                    <button onClick={() => handleViewReport(employee.id)}>View Report</button>
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeProgressTracking;