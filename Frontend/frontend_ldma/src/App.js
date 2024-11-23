import React from 'react';
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
  const [role, setRole] = React.useState('');

  const handleRole = (role) => {
    setRole(role);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login handleRole={handleRole} />} />
        <Route path="/signup" element={<Signup handleRole={handleRole} />} />
        <Route
          path="/manager-dashboard"
          element={role === 'Manager' ? <ManagerDashboard /> : <Navigate to="/" replace />}
        />
        <Route
          path="/training-request"
          element={role === 'Manager' ? <TrainingRequestForm /> : <Navigate to="/" replace />}
        />
        <Route
          path="/admin-dashboard"
          element={role === 'Admin' ? <AdminDashboard /> : <Navigate to="/" replace />}
        />
        <Route
          path="/assign-course/:id"
          element={role === 'Admin' ? <AssignCourse /> : <Navigate to="/" replace />}
        />
        <Route
          path="/courses"
          element={role === 'Admin' ? <Courses /> : <Navigate to="/" replace />}
        />
        <Route
          path="/employee-progress-tracking"
          element={role === 'Admin' ? <EmployeeProgressTracking /> : <Navigate to="/" replace />}
        />
        <Route
          path="/feedback-collection"
          element={role === 'Admin' ? <FeedbackCollection /> : <Navigate to="/" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;