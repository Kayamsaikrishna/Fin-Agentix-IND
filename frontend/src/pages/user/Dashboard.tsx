import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronRight,
  PlusCircle,
  Calendar,
  DollarSign,
  Percent,
  BarChart3,
  Filter,
  Search,
  User,
  LogOut
} from 'lucide-react';

interface Loan {
  id: string;
  sector: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  applicationDate: string;
  lastUpdated: string;
  interestRate?: number;
  tenure?: number;
  emi?: number;
  disbursementDate?: string;
}

interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  date: string;
  read: boolean;
}

interface UserDetails {
  name: string;
  email: string;
  phone: string;
  kycVerified: boolean;
  profileComplete: boolean;
  lastLogin: string;
}

const UserDashboard: React.FC = () => {
  // State for user details, loans, and notifications
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    kycVerified: true,
    profileComplete: true,
    lastLogin: '2023-06-15T10:30:00',
  });
  
  const [loans, setLoans] = useState<Loan[]>([
    {
      id: 'LA-2023-001',
      sector: 'Agriculture',
      amount: 250000,
      status: 'approved',
      applicationDate: '2023-05-10T09:15:00',
      lastUpdated: '2023-05-15T14:30:00',
      interestRate: 7.5,
      tenure: 36,
      emi: 7776,
      disbursementDate: '2023-05-20T10:00:00',
    },
    {
      id: 'LA-2023-002',
      sector: 'Manufacturing',
      amount: 500000,
      status: 'pending',
      applicationDate: '2023-06-05T11:20:00',
      lastUpdated: '2023-06-05T11:20:00',
    },
    {
      id: 'LA-2023-003',
      sector: 'Retail',
      amount: 150000,
      status: 'under_review',
      applicationDate: '2023-06-10T15:45:00',
      lastUpdated: '2023-06-12T09:30:00',
    },
  ]);
  
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'N001',
      message: 'Your Agriculture loan has been approved!',
      type: 'success',
      date: '2023-05-15T14:30:00',
      read: false,
    },
    {
      id: 'N002',
      message: 'Please complete your KYC verification',
      type: 'warning',
      date: '2023-06-01T10:15:00',
      read: true,
    },
    {
      id: 'N003',
      message: 'New loan scheme available in Manufacturing sector',
      type: 'info',
      date: '2023-06-08T09:00:00',
      read: false,
    },
  ]);
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Calculate unread notifications count
  useEffect(() => {
    const count = notifications.filter(notification => !notification.read).length;
    setUnreadCount(count);
  }, [notifications]);
  
  // Function to get status icon and color
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'approved':
        return { icon: <CheckCircle className="w-5 h-5" />, color: 'text-green-500', bgColor: 'bg-green-50' };
      case 'rejected':
        return { icon: <XCircle className="w-5 h-5" />, color: 'text-red-500', bgColor: 'bg-red-50' };
      case 'under_review':
        return { icon: <AlertCircle className="w-5 h-5" />, color: 'text-yellow-500', bgColor: 'bg-yellow-50' };
      case 'pending':
      default:
        return { icon: <Clock className="w-5 h-5" />, color: 'text-blue-500', bgColor: 'bg-blue-50' };
    }
  };
  
  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };
  
  // Function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };
  
  // Function to get notification color
  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 text-green-800 border-green-200';
      case 'warning':
        return 'bg-yellow-50 text-yellow-800 border-yellow-200';
      case 'error':
        return 'bg-red-50 text-red-800 border-red-200';
      case 'info':
      default:
        return 'bg-blue-50 text-blue-800 border-blue-200';
    }
  };
  
  // Function to mark notification as read
  const markAsRead = (id: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  // Function to filter loans
  const getFilteredLoans = () => {
    if (activeFilter === 'all') return loans;
    return loans.filter(loan => loan.status === activeFilter);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-500">Welcome back, {userDetails.name}</p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-full hover:bg-gray-100 relative"
                >
                  <Bell className="w-6 h-6 text-gray-600" />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-10 border border-gray-200">
                    <div className="py-2 px-3 bg-gray-50 border-b border-gray-200">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium text-gray-700">Notifications</h3>
                        <button 
                          onClick={() => {
                            setNotifications(prevNotifications =>
                              prevNotifications.map(notification => ({ ...notification, read: true }))
                            );
                          }}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          Mark all as read
                        </button>
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        <div className="divide-y divide-gray-200">
                          {notifications.map(notification => (
                            <div 
                              key={notification.id} 
                              className={`p-3 ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
                              onClick={() => markAsRead(notification.id)}
                            >
                              <div className={`rounded-md p-2 ${getNotificationColor(notification.type)}`}>
                                <p className="text-sm">{notification.message}</p>
                                <p className="text-xs mt-1 text-gray-500">{formatDate(notification.date)}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 text-center text-gray-500">
                          No notifications
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              {/* User Menu */}
              <div className="relative">
                <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    <User className="w-5 h-5" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Total Applications</h3>
                <p className="text-2xl font-bold">{loans.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Approved Loans</h3>
                <p className="text-2xl font-bold">{loans.filter(loan => loan.status === 'approved').length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Total Amount</h3>
                <p className="text-2xl font-bold">
                  {formatCurrency(loans.reduce((sum, loan) => sum + loan.amount, 0))}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Apply for Loan Button */}
        <div className="mb-8">
          <Link 
            to="/loan-application" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Apply for New Loan
          </Link>
        </div>
        
        {/* Loan Applications */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Your Loan Applications</h2>
              
              <div className="flex space-x-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="form-input pl-10 py-2 pr-4 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Search applications"
                  />
                </div>
                
                <div className="relative">
                  <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <Filter className="h-4 w-4 mr-1" />
                    Filter
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2 mt-4">
              <button 
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1 rounded-full text-sm ${activeFilter === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
              >
                All
              </button>
              <button 
                onClick={() => setActiveFilter('pending')}
                className={`px-3 py-1 rounded-full text-sm ${activeFilter === 'pending' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
              >
                Pending
              </button>
              <button 
                onClick={() => setActiveFilter('under_review')}
                className={`px-3 py-1 rounded-full text-sm ${activeFilter === 'under_review' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
              >
                Under Review
              </button>
              <button 
                onClick={() => setActiveFilter('approved')}
                className={`px-3 py-1 rounded-full text-sm ${activeFilter === 'approved' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
              >
                Approved
              </button>
              <button 
                onClick={() => setActiveFilter('rejected')}
                className={`px-3 py-1 rounded-full text-sm ${activeFilter === 'rejected' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
              >
                Rejected
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            {getFilteredLoans().length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Application ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sector
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Application Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Updated
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">View</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getFilteredLoans().map((loan) => {
                    const statusInfo = getStatusInfo(loan.status);
                    return (
                      <tr key={loan.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {loan.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {loan.sector}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatCurrency(loan.amount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`flex-shrink-0 h-8 w-8 rounded-full ${statusInfo.bgColor} flex items-center justify-center`}>
                              {statusInfo.icon}
                            </div>
                            <div className="ml-2">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusInfo.bgColor} ${statusInfo.color}`}>
                                {loan.status.replace('_', ' ').charAt(0).toUpperCase() + loan.status.replace('_', ' ').slice(1)}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(loan.applicationDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(loan.lastUpdated)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link to={`/loan-details/${loan.id}`} className="text-blue-600 hover:text-blue-900">
                            View Details
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-10">
                <div className="mx-auto w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No loan applications found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {activeFilter === 'all' ? 'Get started by applying for a loan.' : `No ${activeFilter.replace('_', ' ')} applications found.`}
                </p>
                {activeFilter === 'all' && (
                  <div className="mt-6">
                    <Link
                      to="/loan-application"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <PlusCircle className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                      Apply for New Loan
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Loan Details (for approved loans) */}
        {loans.some(loan => loan.status === 'approved') && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Active Loan Details</h2>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loans
                  .filter(loan => loan.status === 'approved')
                  .map(loan => (
                    <div key={loan.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{loan.sector} Loan</h3>
                          <p className="text-sm text-gray-500">{loan.id}</p>
                        </div>
                        <div className={`flex items-center justify-center h-8 w-8 rounded-full ${getStatusInfo('approved').bgColor}`}>
                          {getStatusInfo('approved').icon}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Loan Amount:</span>
                          <span className="text-sm font-medium">{formatCurrency(loan.amount)}</span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Interest Rate:</span>
                          <span className="text-sm font-medium">{loan.interestRate}%</span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Tenure:</span>
                          <span className="text-sm font-medium">{loan.tenure} months</span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">EMI Amount:</span>
                          <span className="text-sm font-medium">{formatCurrency(loan.emi || 0)}</span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Disbursement Date:</span>
                          <span className="text-sm font-medium">{formatDate(loan.disbursementDate || '')}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <Link 
                          to={`/loan-details/${loan.id}`}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                        >
                          View Complete Details
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default UserDashboard;