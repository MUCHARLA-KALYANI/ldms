import React from 'react';
import FeedbackTable from './components/FeedbackTable';
import FeedbackCharts from './components/FeedbackCharts';
import './styles.css';


function App() {
  return (
    <div className="App">
      <h1>Feedback Collection and Reporting</h1>
      <FeedbackTable />
      <FeedbackCharts />
    </div>
  );
}

export default App;
