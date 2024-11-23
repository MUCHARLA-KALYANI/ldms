import React, { useState, useEffect} from 'react';
import TrainingRequestForm from './TrainingRequestForm';

import './App.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ name: '', trainer: '', joinedDate: '', email: '', age: '' });
  const [courseName, setCourseName] = useState('');
  const [courseLevel, setCourseLevel] = useState('');
  const [courseLink, setCourseLink] = useState('');
   const [employeeNameForCourse, setEmployeeNameForCourse] = useState('');
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showAssignCourse, setShowAssignCourse] = useState(false);
  const [viewEmployeeDetails, setViewEmployeeDetails] = useState(false);
  const [viewEmployeeList, setViewEmployeeList] = useState(false);
  const [viewCoursesAssigned, setViewCoursesAssigned] = useState(false);
  const [showTrainingRequestForm, setShowTrainingRequestForm] = useState(false);
  const [viewTrainingForms, setViewTrainingForms] = useState(false);
  const [trainingRequests, setTrainingRequests] = useState([]);
  const [durationFrom, setDurationFrom] = useState('');
  const [durationTo, setDurationTo] = useState('');

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/employees');
        const data = await response.json();
        setEmployees(data);
        setEmployeeOptions(data.map(emp => emp.name));
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    fetchEmployees();
  }, []);
  const addEmployee = async () => {
    console.log("Add Employee button clicked");
    if (newEmployee.name && newEmployee.trainer && newEmployee.joinedDate && newEmployee.email.endsWith('@gmail.com') && newEmployee.id) {
      try {
        const response = await fetch('http://localhost:8081/api/employees', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newEmployee),
        });
        console.log('Response status:', response.status); // Check response status
        if (response.ok) {
          const addedEmployee = await response.json();
          console.log('Employee added:', addedEmployee);
          setEmployees(prevEmployees => [...prevEmployees, addedEmployee]);
          setEmployeeOptions(prevOptions => [...prevOptions, addedEmployee.name]);
          setNewEmployee({ name: '', trainer: '', joinedDate: '', email: '', id: '' });
          setShowAddEmployee(false);
        } else {
          console.error('Failed to add employee, response status:', response.status);
        }
      } catch (error) {
        console.error('Error during API call:', error);
      }
    } else {
      alert('Please fill out all fields correctly, including a valid Gmail address.');
    }
  };
  
  // Assign a course to an employee
  const assignCourse = async () => {
    if (courseName && employeeNameForCourse && courseLevel && durationFrom && durationTo && courseLink) {
      const payload = {
        employeeName: employeeNameForCourse,
        courseName: courseName,
        courselevel: courseLevel,
        duration: `${durationFrom} to ${durationTo}`,
        link: courseLink,
      };
      try {
        const response = await fetch('http://localhost:8081/api/assignments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (response.ok) {
          const data = await response.json();
          console.log('Course assigned successfully:', data);
          setShowAssignCourse(false); // Close modal
        } else {
          console.error('Error in API response:', response.status);
        }
      } catch (error) {
        console.error('Error assigning course:', error);
      }
    } else {
      alert('Please fill out all fields correctly.');
    }
  };
  

  // Submit a training request
  const handleTrainingRequestSubmit = async (requestDetails) => {
    try {
      const response = await fetch('http://localhost:8081/api/training-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestDetails),
      });
      if (response.ok) {
        const newRequest = await response.json();
        setTrainingRequests([...trainingRequests, newRequest]);
        setShowTrainingRequestForm(false);
        setViewTrainingForms(true);
      }
    } catch (error) {
      console.error('Error creating training request:', error);
    }
  };

   // Accept or reject a training request
   const handleRequestAction = async (index, action) => {
    const request = trainingRequests[index];
    try {
      const response = await fetch(`http://localhost:8081/api/training-requests/${request.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: action }),
      });
      if (response.ok) {
        const updatedRequest = await response.json();
        setTrainingRequests(trainingRequests.map((req, i) => (i === index ? updatedRequest : req)));
      }
    } catch (error) {
      console.error(`Error updating training request to ${action}:`, error);
    }
  };
  return (
    <div className="App">
      <nav className="navbar">
        <h1 className="nav-title">Admin Dashboard</h1>
        <div className="navbar-buttons">
          <button onClick={() => setShowAddEmployee(true)}>Add Employee</button>
          <button onClick={() => setShowAssignCourse(true)}>Assign Course</button>
          {/* Removed Create Request Button */}
        </div>
      </nav>

      <div className="container">
        <aside className="sidebar">
          <h2>Menu</h2>
          <button
            className="sidebar-button"
            onClick={() => {
              setViewEmployeeList(true);
              setViewEmployeeDetails(false);
              setViewCoursesAssigned(false);
              setViewTrainingForms(false);
            }}
          >
            Employee List
          </button>
          <button
            className="sidebar-button"
            onClick={() => {
              setViewEmployeeDetails(true);
              setViewEmployeeList(false);
              setViewCoursesAssigned(false);
              setViewTrainingForms(false);
            }}
          >
            Employee Details
          </button>
          <button
            className="sidebar-button"
            onClick={() => {
              setViewCoursesAssigned(true);
              setViewEmployeeDetails(false);
              setViewEmployeeList(false);
              setViewTrainingForms(false);
            }}
          >
            Courses Assigned
          </button>
          <button
            className="sidebar-button training-forms-button"
            style={{ backgroundColor: 'blue', color: 'white' }}
            onClick={() => {
              setViewTrainingForms(true);
              setViewEmployeeDetails(false);
              setViewEmployeeList(false);
              setViewCoursesAssigned(false);
            }}
          >
            Training Forms
          </button>
        </aside>
        

        <main className="main-content">
          {showAddEmployee && (
            <div className="modal-overlay">
              <div className="modal">
                <h2>Add Employee</h2>
                <div className="modal-form">
                <h3 id="EN">Employee Name</h3>
                  <input
                    type="text"
                    name="name"
                    placeholder="Employee Name"
                    value={newEmployee.name}
                    onChange={handleInputChange}
                  /><h3 id="EA">Employee id</h3>
                  <input
                    type="text"
                    name="id"
                    placeholder="Employee id"
                    value={newEmployee.id}
                    onChange={handleInputChange}
                  /><h3 id="TN">Trainer Name</h3>
                  <input
                    type="text"
                    name="trainer"
                    placeholder="Trainer Name"
                    value={newEmployee.trainer}
                    onChange={handleInputChange}
                  /><h3 id="h3">Joined date</h3>
                  <input
                    type="date"
                    name="joinedDate"
                    value={newEmployee.joinedDate}
                    onChange={handleInputChange}
                  /><h3 id="EI">Email ID</h3>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email ID (must be @gmail.com)"
                    value={newEmployee.email}
                    onChange={handleInputChange}
                  />
                  <button onClick={addEmployee}>Add Employee</button>
                  <button onClick={() => setShowAddEmployee(false)}>Close</button>

                </div>
              </div>
            </div>
          )}

{showAssignCourse && (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Assign Course</h2>
        <div className="modal-form">
        <h3 id="CN">Course Name</h3>
          <input
            type="text"
            placeholder="Course Name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
          <h3 id="CL">Course Level</h3>
          <input
            type="text"
            placeholder="Course Level"
            value={courseLevel}
            onChange={(e) => setCourseLevel(e.target.value)}
          />
          <h3 id="DF">Start Date</h3>
          <input
            type="date"
            value={durationFrom}
            onChange={(e) => setDurationFrom(e.target.value)}
          />
          <h3 id="DT">End Date</h3>
          <input
            type="date"
            value={durationTo}
            onChange={(e) => setDurationTo(e.target.value)}
          />
          <h3 id="CL">Course Link</h3>
          <input
            type="text"
            placeholder="Course Link"
            value={courseLink}
            onChange={(e) => setCourseLink(e.target.value)}
          />
          <select onChange={(e) => setEmployeeNameForCourse(e.target.value)}>
                    <option value="">Select Employee</option>
                    {employeeOptions
                      .filter(emp => !employees.find(e => e.name === emp && e.course))
                      .map((emp, index) => (
                        <option key={index} value={emp}>
                          {emp}
                        </option>
              ))}
          </select>
          <button onClick={assignCourse}>Assign Course</button>
          <button onClick={() => setShowAssignCourse(false)}>Close</button>
        </div>
      </div>
    </div>
  )}

          {showTrainingRequestForm && (
            <div className="modal-overlay">
              <div className="modal">
                <TrainingRequestForm onSubmit={handleTrainingRequestSubmit} />
                <button onClick={() => setShowTrainingRequestForm(false)}>Close</button>
              </div>
            </div>
          )}

          {viewEmployeeList && (
            <div className="employee-list">
              <h2>Employee List</h2>
              <table>
                <thead>
                  <tr>
                   <th>Employee ID</th>
                    <th>Employee Name</th>
                    <th>Trainer Name</th>
                    <th>Joined Date</th>
                    <th>Course Name</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp, index) => (
                    <tr key={index}>
                      <td>{emp.id}</td>
                      <td>{emp.name}</td>
                      <td>{emp.trainer}</td>
                      <td>{emp.joinedDate}</td>
                      <td>{emp.course || 'Not Assigned'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
{viewEmployeeDetails && (
  <div className="employee-details">
    <h2>Employee Details</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
         
          <th>Email</th>
          <th>ID</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp, index) => (
          <tr key={index}>
            <td>{emp.name}</td>
            
            
            <td>{emp.email}</td>
            <td>{emp.id}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}



{viewCoursesAssigned && (
  <div className="courses-assigned">
    <h2>Courses Assigned</h2>
    <table>
      <thead>
        <tr>
          <th>Employee Name</th>
          <th>Course Name</th>
          <th>Course Level</th>
          <th>Duration</th>
          <th>Action</th> {/* Added Action column header */}
        </tr>
      </thead>
      <tbody>
        {employees
          .filter(emp => emp.course)
          .map((emp, index) => (
            <tr key={index}>
              <td>{emp.name}</td>
              <td>{emp.course}</td>
              <td>{emp.level}</td>
              <td>{emp.duration}</td>
              <td>
                {emp.link ? (
                  <a href={emp.link} target="_blank" rel="noopener noreferrer">
                    View Course
                  </a>
                ) : (
                  'No Link Available'
                )}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
)}


          {viewTrainingForms && (
            <div className="training-forms">
             
              <table>
                
                <tbody>
                {viewTrainingForms && (
  <div className="training-forms">
    <h2>Training Requests</h2>
    
    {/* New Section for 3 small containers */}
    <div className="summary-containers">
      <div className="summary-container">
        <h3>Course Created</h3>
        <p>{courseName || "No course created yet"}</p>
      </div>
      <div className="summary-container">
        <h3>Employees</h3>
        <p>{employees.length} Employees</p>
      </div>
      <div className="summary-container">
        <h3>Request</h3>
        <p>{trainingRequests.length} Requests</p>
      </div>
    </div>

    {/* Training Request Table */}
    <table>
      <thead>
        <tr>
          <th>Employee Name</th>
          <th>Course Requested</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {trainingRequests.map((request, index) => (
          <tr key={index}>
            <td>{request.name}</td>
            <td>{request.course}</td>
            <td>
              {request.status ? (
                <span>{request.status}</span>
              ) : (
                <>
                  <button onClick={() => handleRequestAction(index, 'Accepted')}>Accept</button>
                  <button onClick={() => handleRequestAction(index, 'Rejected')}>Reject</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;