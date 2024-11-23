import React from 'react';
import Navbar from './Navbar'; 
import Header from './Header'; 
import Sidebar from './Sidebar'; 
import EmployeeList from './EmployeeList'; 

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      {/* Header and Sidebar */}
      <Header />
      <div className="admin-dashboard-body">
        <Sidebar />
        
        <div className="admin-dashboard-content">
          {/* Navbar inside the content area */}
          <Navbar />
          
          {/* Main content: Employee List or other components */}
          <div className="main-content">
            <h2>Welcome to the Admin Dashboard</h2>
            <EmployeeList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
