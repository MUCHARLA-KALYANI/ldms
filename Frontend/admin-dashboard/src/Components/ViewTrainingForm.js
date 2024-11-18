import React from 'react';

function ViewTrainingForms({ trainingRequests, onAction }) {
  return (
    <div>
      <h2>Training Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Course Requested</th>
            <th>Job Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {trainingRequests.map((request, index) => (
            <tr key={index}>
              <td>{request.employeeId}</td>
              <td>{request.firstName}</td>
              <td>{request.courseRequested}</td>
              <td>{request.jobDescription}</td>
              <td>
                <button onClick={() => onAction(index, 'accept')}>Accept</button>
                <button onClick={() => onAction(index, 'reject')}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewTrainingForms;
