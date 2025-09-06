import React, { useState } from 'react';
import { 
  DollarSign, 
  FileText, 
  CheckCircle, 
  Clock, 
  XCircle, 
  TrendingUp,
  CreditCard,
  Calendar,
  AlertCircle,
  Plus,
  ArrowRight,
  Bell,
  User
} from 'lucide-react';

const UserDashboard = () => {
  const [user] = useState({
    name: "John Doe",
    email: "john.doe@email.com",
    creditScore: 742,
    profileComplete: 85
  });

  const [loans] = useState([
    { id: 1, amount: 50000, status: 'approved', date: '2024-09-01', type: 'Personal Loan', emi: 4200 },
    { id: 2, amount: 25000, status: 'pending', date: '2024-09-03', type: 'Emergency Loan', emi: null },
    { id: 3, amount: 75000, status: 'rejected', date: '2024-08-28', type: 'Business Loan', emi: null }
  ]);

  const [notifications] = useState([
    { id: 1, message: "Your loan application #0002 is under review", time: "2 hours ago", type: "info" },
    { id: 2, message: "EMI payment due in 3 days", time: "1 day ago", type: "warning" },
    { id: 3, message: "KYC verification completed successfully", time: "2 days ago", type: "success" }
  ]);

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
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
              <p className="text-gray-600">Here's your loan portfolio overview</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-2">
                <User className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Profile Completion Alert */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              <div>
                <h3 className="text-sm font-medium text-blue-800">Complete your profile</h3>
                <p className="text-sm text-blue-600">Your profile is {user.profileComplete}% complete. Complete it to unlock better loan offers.</p>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Complete Now
            </button>
          </div>
          <div className="mt-3">
            <div className="bg-blue-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${user.profileComplete}%` }}></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Active Loans</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">1</p>
                    <p className="text-green-600 text-sm mt-1">↗ Recently approved</p>
                  </div>
                  <CreditCard className="w-12 h-12 text-blue-500 bg-blue-50 p-2 rounded-lg" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Total Borrowed</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">₹50K</p>
                    <p className="text-gray-600 text-sm mt-1">Monthly EMI: ₹4,200</p>
                  </div>
                  <DollarSign className="w-12 h-12 text-green-500 bg-green-50 p-2 rounded-lg" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Credit Score</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{user.creditScore}</p>
                    <p className="text-green-600 text-sm mt-1">Excellent rating</p>
                  </div>
                  <TrendingUp className="w-12 h-12 text-purple-500 bg-purple-50 p-2 rounded-lg" />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="flex items-center justify-between p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all group">
                  <div className="flex items-center space-x-3">
                    <Plus className="w-8 h-8 text-blue-600 bg-blue-100 p-1 rounded-lg group-hover:bg-blue-200 transition-colors" />
                    <div className="text-left">
                      <span className="block text-sm font-semibold text-gray-900">Apply for New Loan</span>
                      <span className="block text-xs text-gray-600">Get instant approval</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </button>

                <button className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all group">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-8 h-8 text-green-600 bg-green-100 p-1 rounded-lg group-hover:bg-green-200 transition-colors" />
                    <div className="text-left">
                      <span className="block text-sm font-semibold text-gray-900">Upload Documents</span>
                      <span className="block text-xs text-gray-600">Update your files</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </button>

                <button className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all group">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-8 h-8 text-purple-600 bg-purple-100 p-1 rounded-lg group-hover:bg-purple-200 transition-colors" />
                    <div className="text-left">
                      <span className="block text-sm font-semibold text-gray-900">Complete KYC</span>
                      <span className="block text-xs text-gray-600">Verify your identity</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </button>

                <button className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all group">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-8 h-8 text-orange-600 bg-orange-100 p-1 rounded-lg group-hover:bg-orange-200 transition-colors" />
                    <div className="text-left">
                      <span className="block text-sm font-semibold text-gray-900">Payment Schedule</span>
                      <span className="block text-xs text-gray-600">View EMI calendar</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </button>
              </div>
            </div>

            {/* My Loan Applications */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">My Loan Applications</h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
              </div>
              <div className="space-y-4">
                {loans.map((loan) => (
                  <div key={loan.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(loan.status)}
                        <div>
                          <h3 className="font-semibold text-gray-900">{loan.type} #{loan.id.toString().padStart(4, '0')}</h3>
                          <p className="text-gray-600 text-sm">Amount: ₹{loan.amount.toLocaleString()}</p>
                          {loan.emi && (
                            <p className="text-green-600 text-sm">EMI: ₹{loan.emi.toLocaleString()}/month</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(loan.status)}`}>
                          {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                        </span>
                        <p className="text-gray-500 text-sm mt-2">{new Date(loan.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Credit Score Widget */}
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl shadow-sm p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Credit Health</h3>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{user.creditScore}</div>
                <div className="text-purple-200 text-sm">Excellent Score</div>
                <div className="bg-white bg-opacity-20 rounded-full h-2 mt-4">
                  <div className="bg-white h-2 rounded-full" style={{ width: `${(user.creditScore / 850) * 100}%` }}></div>
                </div>
                <button className="mt-4 bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg text-sm hover:bg-opacity-30 transition-colors">
                  Improve Score
                </button>
              </div>
            </div>

            {/* Recent Notifications */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Notifications</h3>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div key={notification.id} className={`p-3 rounded-lg border ${getNotificationColor(notification.type)}`}>
                    <p className="text-sm text-gray-900 font-medium">{notification.message}</p>
                    <p className="text-xs text-gray-600 mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
              <button className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium">
                View all notifications
              </button>
            </div>

            {/* Support Widget */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
              <p className="text-gray-600 text-sm mb-4">Our support team is here to assist you with any questions.</p>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;