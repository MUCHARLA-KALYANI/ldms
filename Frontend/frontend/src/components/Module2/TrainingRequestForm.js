import React, { useState } from 'react'; 
import './TrainingRequestForm.css';

const TrainingRequestForm = () => {
    const [formData, setFormData] = useState({
        employeeId: '',
        firstName: '',
        lastName: '',
        courseRequested: '',
        offeredBy: '',
        startDate: '',
        endDate: '',
        jobDescription: '',
        skillType: '',
        additionalComments: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const calculateDuration = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // duration in days
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8081/api/trainingRequests/create", { // Using environment variable for the base URL
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    courseName: formData.courseRequested,
                    description: formData.jobDescription,
                    concepts: formData.skillType,
                    duration: calculateDuration(formData.startDate, formData.endDate),
                    position: `${formData.firstName} ${formData.lastName}`, 
                    status: "PENDING",
                    createdDate: new Date().toISOString().split("T")[0]
                })
            });

            if (response.status === 201) {
                const data = await response.json();
                console.log("Request created successfully:", data);
                alert("Request created successfully");
                handleReset();
            } else {
                console.error("Failed to create request");
                alert("Failed to create request");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    };

    const handleReset = () => {
        setFormData({
            employeeId: '',
            firstName: '',
            lastName: '',
            courseRequested: '',
            offeredBy: '',
            startDate: '',
            endDate: '',
            jobDescription: '',
            skillType: '',
            additionalComments: ''
        });
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Training Request Form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Employee Id:
                        <input
                            type="number"
                            name="employeeId"
                            value={formData.employeeId}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        First Name:
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Last Name:
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Course Requested:
                        <input
                            type="text"
                            name="courseRequested"
                            value={formData.courseRequested}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Offered By (Organisation Name):
                        <input
                            type="text"
                            name="offeredBy"
                            value={formData.offeredBy}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Expected Start Date:
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Expected End Date:
                        <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Your Job Description:
                        <textarea
                            name="jobDescription"
                            value={formData.jobDescription}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Types Of Skill This Training Covers (Hard/Soft/Other):
                        <select
                            name="skillType"
                            value={formData.skillType}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select</option>
                            <option value="Hard">Hard Skills</option>
                            <option value="Soft">Soft Skills</option>
                            <option value="Other">Other</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Additional Comments:
                        <textarea
                            name="additionalComments"
                            value={formData.additionalComments}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <button type="button" onClick={handleReset}>
                        Reset Form
                    </button>
                    <button type="submit">
                        Submit Request
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TrainingRequestForm;
