const express = require('express'); // Define express only once
const app = express(); // Define app only once

// Middleware to parse JSON request bodies
app.use(express.json());

// Sample data to mimic database (replace with real database logic)
let trainingRequests = [
    {
        id: 1,
        courseName: "Leadership Training",
        description: "Training for leadership skills development.",
        concepts: "Leadership theories, team management.",
        duration: 3,
        position: "Manager",
        status: "PENDING",
        createdDate: "2024-11-01"
    },
    {
        id: 2,
        courseName: "Java Fundamentals",
        description: "A training session on Java fundamentals.",
        concepts: "OOP, Collections, Streams.",
        duration: 5,
        position: "Developer",
        status: "PENDING",
        createdDate: "2024-11-01"
    }
];

// POST route for creating a training request
app.post('/api/trainingRequests/create', (req, res) => {
    const { courseName, description, concepts, duration, position, status, createdDate } = req.body;
    if (!courseName || !description || !concepts || !duration || !position || !status || !createdDate) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const newRequest = {
        id: trainingRequests.length + 1, // Generate a new ID
        courseName,
        description,
        concepts,
        duration,
        position,
        status,
        createdDate
    };

    // Add the new request to the mock database
    trainingRequests.push(newRequest);

    // Log the request body (optional for debugging)
    console.log("Training Request received:", req.body);

    // Simulate a successful creation response
    res.status(201).json({ message: "Training Request created successfully", data: newRequest });
});

// GET route for retrieving all training requests
app.get('/api/trainingRequests/all', (req, res) => {
    // Send the array of training requests as the response
    res.status(200).json(trainingRequests);
});

// GET route to retrieve a specific training request by ID
app.get('/api/trainingRequests/:id', (req, res) => {
    const requestId = parseInt(req.params.id);
    const trainingRequest = trainingRequests.find(tr => tr.id === requestId);

    if (trainingRequest) {
        res.status(200).json(trainingRequest);
    } else {
        res.status(404).json({ error: "Training request not found" });
    }
});

app.put('/api/trainingRequests/update/:id', (req, res) => {
    const requestId = parseInt(req.params.id);
    const { status } = req.body;

    // Find the training request with the given ID
    const trainingRequest = trainingRequests.find(tr => tr.id === requestId);

    // If the request is not found, return a 404 error
    if (!trainingRequest) {
        return res.status(404).json({ error: "Training request not found" });
    }

    // Validate the new status
    if (status !== "APPROVED" && status !== "REJECTED") {
        return res.status(400).json({ error: "Invalid status. Use 'APPROVED' or 'REJECTED'." });
    }

    // Update the status
    trainingRequest.status = status;

    // Send the updated training request as the response
    res.status(200).json(trainingRequest);
});
// DELETE route to delete a training request by ID
app.delete('/api/trainingRequests/delete/:id', (req, res) => {
    const requestId = parseInt(req.params.id);
    const requestIndex = trainingRequests.findIndex(tr => tr.id === requestId);

    // If the request is not found, return a 404 error
    if (requestIndex === -1) {
        return res.status(404).json({ error: "Training request not found" });
    }

    // Remove the training request from the array
    trainingRequests.splice(requestIndex, 1);

    // Send a success response with no content
    res.status(204).send();
});

// Start the server on port 8081
app.listen(8081, () => {
    console.log('Server is running on http://localhost:8081');
});