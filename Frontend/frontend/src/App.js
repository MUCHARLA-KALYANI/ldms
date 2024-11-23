import React, { useState } from 'react';
import LoginPage from './components/Module1/LoginPage';
import SignupPage from './components/Module1/SignupPage';
import TrainingRequestForm from './components/Module2/TrainingRequestForm';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Handle login success
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setCurrentPage('home'); // Go back to the home page
  };

  // Handle signup success
  const handleSignupSuccess = () => {
    setIsAuthenticated(true);
    setCurrentPage('home'); // Go back to the home page after signup
  };

  return (
    <div className="App">
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1>Learning and Development Management System</h1>
        <div>
          <button onClick={() => setCurrentPage('login')}>Login</button> | 
          <button onClick={() => setCurrentPage('signup')}>Signup</button>
        </div>
      </div>

      {currentPage === 'login' && <LoginPage onLoginSuccess={handleLoginSuccess} />}
      {currentPage === 'signup' && <SignupPage onSignupSuccess={handleSignupSuccess} />}
      
      {/* Render TrainingRequestForm only if authenticated */}
      {isAuthenticated && <TrainingRequestForm />}

    </div>
  );
}

export default App;