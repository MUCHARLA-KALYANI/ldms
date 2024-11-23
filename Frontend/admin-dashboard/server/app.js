const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8081;

app.use(bodyParser.json());

let employees = [];
let courses = [];
let trainingRequests = [];
let assignments = [];

// Employee Routes

// Create a new employee
app.post('/api/employees', (req, res) => {
  const employee = { id: employees.length + 1, ...req.body };
  employees.push(employee);
  res.status(201).json(employee);
});

// Get all employees
app.get('/api/employees', (req, res) => {
  res.json(employees);
});

// Get employee by ID
app.get('/api/employees/:id', (req, res) => {
  const employee = employees.find(emp => emp.id === parseInt(req.params.id));
  employee ? res.json(employee) : res.status(404).send('Employee not found');
});

// Update employee by ID
app.put('/api/employees/:id', (req, res) => {
  const employee = employees.find(emp => emp.id === parseInt(req.params.id));
  if (employee) {
    Object.assign(employee, req.body);
    res.json(employee);
  } else {
    res.status(404).send('Employee not found');
  }
});

// Delete employee by ID
app.delete('/api/employees/:id', (req, res) => {
  employees = employees.filter(emp => emp.id !== parseInt(req.params.id));
  res.status(204).send();
});

// Course Routes

// Course Routes
app.post('/api/courses', (req, res) => {
  const course = { id: courses.length + 1, ...req.body };
  courses.push(course);
  res.status(201).json(course);
});



app.get('/api/courses', (req, res) => {
  res.json(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(crs => crs.id === parseInt(req.params.id));
  course ? res.json(course) : res.status(404).send('Course not found');
});

app.put('/api/courses/:id', (req, res) => {
  const course = courses.find(crs => crs.id === parseInt(req.params.id));
  if (course) {
    Object.assign(course, req.body);
    res.json(course);
  } else {
    res.status(404).send('Course not found');
  }
});

app.delete('/api/courses/:id', (req, res) => {
  courses = courses.filter(crs => crs.id !== parseInt(req.params.id));
  res.status(204).send();
});

// Assignment Routes

// Create a new assignment
app.post('/api/assignments', (req, res) => {
  const { employeeName, courseName, courseLevel, duration, link } = req.body;

  if (!employeeName || !courseName || !courseLevel || !duration || !link) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Create the assignment
  const assignment = { id: assignments.length + 1, employeeName, courseName, courseLevel, duration, link };
  assignments.push(assignment);

  // Update the employee's record
  const employee = employees.find(emp => emp.name === employeeName);
  if (employee) {
    employee.course = courseName; // Assign the course name
    employee.level = courseLevel;
    employee.duration = duration;
    employee.link = link;
  }

  res.status(201).json(assignment);
});


// Get all assignments
app.get('/api/assignments', (req, res) => {
  res.json(assignments);
});

// Get assignment by ID
app.get('/api/assignments/:id', (req, res) => {
  const assignment = assignments.find(asgn => asgn.id === parseInt(req.params.id));
  assignment ? res.json(assignment) : res.status(404).send('Assignment not found');
});

// Update assignment by ID
app.put('/api/assignments/:id', (req, res) => {
  const assignment = assignments.find(asgn => asgn.id === parseInt(req.params.id));
  if (assignment) {
    Object.assign(assignment, req.body);
    res.json(assignment);
  } else {
    res.status(404).send('Assignment not found');
  }
});

// Delete assignment by ID
app.delete('/api/assignments/:id', (req, res) => {
  assignments = assignments.filter(asgn => asgn.id !== parseInt(req.params.id));
  res.status(204).send();
});

// Training Request Routes

// Create a new training request
app.post('/api/training-requests', (req, res) => {
  const request = { id: trainingRequests.length + 1, status: 'Pending', ...req.body };
  trainingRequests.push(request);
  res.status(201).json(request);
});

// Get all training requests
app.get('/api/training-requests', (req, res) => {
  res.json(trainingRequests);
});

// Update training request status by ID (Accept or Reject)
app.put('/api/training-requests/:id', (req, res) => {
  const request = trainingRequests.find(req => req.id === parseInt(req.params.id));
  if (request) {
    request.status = req.body.status; // Status can be 'Accepted' or 'Rejected'
    res.json(request);
  } else {
    res.status(404).send('Training request not found');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
