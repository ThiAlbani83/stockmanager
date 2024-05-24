import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Stock Management System</h1>
        <div className="flex space-x-4">
          <Link to="/sales" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Go to Sales Page
          </Link>
          <Link to="/stock" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Go to Stock Page
          </Link>
          <Link to="/tracking" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Go to Tracking Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
