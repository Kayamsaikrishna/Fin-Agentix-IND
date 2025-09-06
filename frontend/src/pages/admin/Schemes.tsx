import React, { useState, useEffect } from 'react';
import { getSchemes } from '../../api/mock';
import { Scheme } from '../../types/scheme';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

const AdminSchemes: React.FC = () => {
  const [schemes, setSchemes] = useState<Scheme[]>([]);

  useEffect(() => {
    const fetchSchemes = async () => {
      const schemesData = await getSchemes();
      setSchemes(schemesData);
    };

    fetchSchemes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Loan Scheme Management</h1>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
            <PlusCircle className="w-5 h-5 mr-2" />
            Create New Scheme
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scheme Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sector</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {schemes.map((scheme) => (
                <tr key={scheme.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{scheme.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{scheme.sector}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{scheme.interestRate}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{scheme.maxAmount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${scheme.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {scheme.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="p-2 rounded-md hover:bg-gray-100">
                        <Edit className="w-5 h-5 text-gray-500" />
                      </button>
                      <button className="p-2 rounded-md hover:bg-gray-100">
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminSchemes;
