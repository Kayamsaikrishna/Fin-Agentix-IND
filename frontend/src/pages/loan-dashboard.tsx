import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  FileText, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Users, 
  TrendingUp,
  CreditCard,
  Calendar,
  AlertCircle
} from 'lucide-react';

const Dashboard = () => {
  const [userType, setUserType] = useState('user'); // 'user' or 'admin'
  const [loans, setLoans] = useState([
    { id: 1, amount: 50000, status: 'approved', date: '2024-09-01' },
    { id: 2, amount: 25000, status: 'pending', date: '2024-09-03' },
    { id: 3, amount: 75000, status: 'rejected', date: '2024-08-28' }
  ]);

  const [adminStats, setAdminStats] = useState({
    totalApplications: 145,
    approvedLoans: 89,
    pendingReviews: 32,
    totalDisbursed: 2450000
  });

  const toggleUserType = () => {
    setUserType(userType === 'user' ? 'admin' : 'user');
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (userType === 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage loan applications and monitor performance</p>
            </div>
            <button
              onClick={toggleUserType}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Switch to User View
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Applications</p>
                  <p className="text-2xl font-bold text-gray-900">{adminStats.totalApplications}</p>
                </div>
                <FileText className="w-10 h-10 text-blue-500" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Approved Loans</p>
                  <p className="text-2xl font-bold text-gray-900">{adminStats.approvedLoans}</p>
                </div>
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Pending Reviews</p>
                  <p className="text-2xl font-bold text-gray-900">{adminStats.pendingReviews}</p>
                </div>
                <Clock className="w-10 h-10 text-yellow-500" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Disbursed</p>
                  <p className="text-2xl font-bold text-gray-900">₹{(adminStats.totalDisbursed / 100000).toFixed(1)}L</p>
                </div>
                <DollarSign className="w-10 h-10 text-purple-500" />
              </div>
            </div>
          </div>

          {/* Recent Applications Table */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Applications</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Application ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loans.map((loan) => (
                    <tr key={loan.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">#{loan.id.toString().padStart(4, '0')}</td>
                      <td className="py-3 px-4">₹{loan.amount.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(loan.status)}`}>
                          {getStatusIcon(loan.status)}
                          <span className="ml-1 capitalize">{loan.status}</span>
                        </span>
                      </td>
                      <td className="py-3 px-4">{new Date(loan.date).toLocaleDateString()}</td>
                      <td className="py-3 px-4">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // User Dashboard
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, John!</h1>
            <p className="text-gray-600">Manage your loan applications and track progress</p>
          </div>
          <button
            onClick={toggleUserType}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Admin View
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Active Loans</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
              <CreditCard className="w-10 h-10 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Borrowed</p>
                <p className="text-2xl font-bold text-gray-900">₹1.2L</p>
              </div>
              <DollarSign className="w-10 h-10 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Credit Score</p>
                <p className="text-2xl font-bold text-gray-900">742</p>
              </div>
              <TrendingUp className="w-10 h-10 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <DollarSign className="w-8 h-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">Apply for Loan</span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <FileText className="w-8 h-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">Upload Documents</span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <CheckCircle className="w-8 h-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">Complete KYC</span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <Calendar className="w-8 h-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">Payment Schedule</span>
            </button>
          </div>
        </div>

        {/* My Loan Applications */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">My Loan Applications</h2>
          <div className="space-y-4">
            {loans.map((loan) => (
              <div key={loan.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(loan.status)}
                    <div>
                      <h3 className="font-semibold text-gray-900">Personal Loan #{loan.id.toString().padStart(4, '0')}</h3>
                      <p className="text-gray-600 text-sm">Amount: ₹{loan.amount.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(loan.status)}`}>
                      {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                    </span>
                    <p className="text-gray-500 text-sm mt-1">{new Date(loan.date).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;