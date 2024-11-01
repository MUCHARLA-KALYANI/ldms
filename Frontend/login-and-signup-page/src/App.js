import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';


function App() {
  return (
    <Router>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1>Learning and Development Management System</h1>
        <nav>
          <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link>
        </nav>
      </div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}


export default App;
