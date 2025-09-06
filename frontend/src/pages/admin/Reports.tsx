import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', loans: 4000, users: 2400 },
  { name: 'Feb', loans: 3000, users: 1398 },
  { name: 'Mar', loans: 2000, users: 9800 },
  { name: 'Apr', loans: 2780, users: 3908 },
  { name: 'May', loans: 1890, users: 4800 },
  { name: 'Jun', loans: 2390, users: 3800 },
  { name: 'Jul', loans: 3490, users: 4300 },
];

const AdminReports: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Reports & Analytics</h1>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Loan Application Trends</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="loans" fill="#8884d8" name="Loan Applications" />
              <Bar dataKey="users" fill="#82ca9d" name="New Users" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
