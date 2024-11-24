import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">Learning and Development Management System</h1>
      <div className="d-flex flex-column align-items-center gap-3">
        <Link to="/login" className="w-100">
          <button className="btn btn-primary w-100" style={{ maxWidth: '300px' }}>
            Login
          </button>
        </Link>
        <Link to="/signup" className="w-100">
          <button className="btn btn-secondary w-100" style={{ maxWidth: '300px' }}>
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
