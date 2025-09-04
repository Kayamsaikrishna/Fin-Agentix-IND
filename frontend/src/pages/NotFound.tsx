// src/pages/NotFound.tsx
// TODO: Implement NotFound.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { SearchX } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4 font-sans">
      <div className="max-w-md w-full">
        <div className="flex justify-center mb-6">
            <div className="p-5 bg-blue-100 rounded-full">
                <SearchX className="h-16 w-16 text-blue-600" strokeWidth={1.5} />
            </div>
        </div>
        
        <h1 className="text-8xl font-extrabold text-gray-800 tracking-tighter">
          404
        </h1>
        
        <h2 className="mt-4 text-3xl font-bold text-gray-900">
          Page Not Found
        </h2>
        
        <p className="mt-4 text-lg text-gray-600">
          Sorry, we couldn’t find the page you’re looking for. It might have been moved, deleted, or you may have mistyped the URL.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/loans"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-sm"
          >
            Return to Homepage
          </Link>
          <Link
            to="/contact" 
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
