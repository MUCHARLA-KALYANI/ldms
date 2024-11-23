import React, { useState, useEffect } from 'react';
import './FeedbackCollection.css';
import { PieChart } from 'react-minimal-pie-chart';

const FeedbackCollection = () => {
  const [feedback, setFeedback] = useState([]);
  const [ratings, setRatings] = useState({
    good: 0,
    better: 0,
    poor: 0,
  });

  useEffect(() => {
    // Call API to get feedback
    const feedbackData = [
      { id: 1, feedback: 'good', rating: 5, submittedBy: 'John Doe' },
      { id: 2, feedback: 'better', rating: 4, submittedBy: 'Jane Doe' },
      { id: 3, feedback: 'poor', rating: 2, submittedBy: 'Bob Smith' },
    ];
    setFeedback(feedbackData);

    // Calculate ratings
    const ratingsData = {
      good: feedbackData.filter((feedback) => feedback.rating >= 4).length,
      better: feedbackData.filter((feedback) => feedback.rating === 3).length,
      poor: feedbackData.filter((feedback) => feedback.rating <= 2).length,
    };
    setRatings(ratingsData);
  }, []);

  return (
    <div className="feedback-collection-container">
      <h1>Feedback Collection</h1>
      <table>
        <thead>
          <tr>
            <th>Feedback Id</th>
            <th>Feedback</th>
            <th>Rating</th>
            <th>Submitted By</th>
          </tr>
        </thead>
        <tbody>
          {feedback.map((feedback) => (
            <tr key={feedback.id}>
              <td>{feedback.id}</td>
              <td>{feedback.feedback}</td>
              <td>{feedback.rating}/5</td>
              <td>{feedback.submittedBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pie-chart-container">
        <PieChart
          data={[
            { title: 'Good', value: ratings.good, color: '#4CAF50' },
            { title: 'Better', value: ratings.better, color: '#FF9800' },
            { title: 'Poor', value: ratings.poor, color: '#F44336' },
          ]}
          radius={40}
          label={(props) => Math.round(props.percent) + '%'}
        />
      </div>
    </div>
  );
};

export default FeedbackCollection;