import React, { useState } from 'react';
import './TrainingRequestForm.css'; // Import the CSS file

// ... rest of your component code

const TrainingRequestForm = () => {
    const [formData, setFormData] = useState({       
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Here you can add your form submission logic (e.g., API call)
    };

    const handleReset = () => {
        setFormData({
           
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
                        Create New Request
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