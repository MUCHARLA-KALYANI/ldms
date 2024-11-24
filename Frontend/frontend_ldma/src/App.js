import React from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Module1/Home';
import Login from './components/Module1/Login';
import Signup from './components/Module1/Signup';
import ManagerDashboard from './components/Module2/ManagerDashboard';
import TrainingRequestForm from './components/Module2/TrainingRequestForm';
import AdminDashboard from './components/Module3/AdminDashboard';
import AssignCourse from './components/Module3/AssignCourse';
import Courses from './components/Module3/Courses';
import EmployeeProgressTracking from './components/Module4/EmployeeProgressTracking';
import FeedbackCollection from './components/Module5/FeedbackCollection';

const App = () => {
  const [role, setRole] = React.useState(localStorage.getItem('role') || '');

  const handleRole = (newRole) => {
    setRole(newRole);
    localStorage.setItem('role', newRole); // Persist role
  };

  React.useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole && storedRole !== role) {
      setRole(storedRole); // Sync state with localStorage
    }
  }, [role]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Default route logic */}
        <Route
          path="/"
          element={
            role === '' ? (  // If no role is set in localStorage
              <Home />
            ) : role === 'ROLE_ADMIN' ? (
              <Navigate to="/admin-dashboard" replace />
            ) : role === 'ROLE_MANAGER' ? (
              <Navigate to="/manager-dashboard" replace />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        {/* Authentication routes */}
        <Route path="/login" element={<Login handleRole={handleRole} />} />
        <Route path="/signup" element={<Signup handleRole={handleRole} />} />

        {/* Manager routes */}
        <Route path="/manager-dashboard" element={<ManagerDashboard />} />
        <Route path="/training-request" element={<TrainingRequestForm />} />

        {/* Admin routes */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/assign-course/:id" element={<AssignCourse />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/employee-progress-tracking" element={<EmployeeProgressTracking />} />
        <Route path="/feedback-collection" element={<FeedbackCollection />} />

        {/* Fallback route */}
        <Route path="*" element={<h2>404: Page Not Found. <Link to="/">Go Home</Link></h2>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
