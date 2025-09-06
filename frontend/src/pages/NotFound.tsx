import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-600">404</h1>
        <p className="text-2xl md:text-3xl font-light text-gray-800 mt-4">Page Not Found</p>
        <p className="mt-2 text-gray-600">Sorry, the page you are looking for does not exist.</p>
        <Link to="/dashboard" className="mt-6 inline-block px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">Go to Dashboard</Link>
      </div>
    </div>
  );
};

export default NotFound;
