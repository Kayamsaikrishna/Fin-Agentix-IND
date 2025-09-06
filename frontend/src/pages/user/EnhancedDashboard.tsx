import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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
  User,
  Filter,
  ChevronRight,
  Search,
  Download,
  Upload,
  Briefcase,
  Home
} from 'lucide-react';
import { RootState, AppDispatch } from '../../store';
import { 
  fetchUserLoans, 
  fetchLoanSchemes,
  selectLoans, 
  selectLoanSchemes,
  selectLoanLoading,
  selectLoanError
} from '../../store/slices/loanSlice';
import { calculateEMI } from '../../utils/loanCalculator';

// Using the LoanApplication type from our Redux slice instead of the local interface
// interface Loan {
//   id: number;
//   amount: number;
//   status: 'approved' | 'pending' | 'rejected' | 'disbursed' | 'closed';
//   date: string;
//   type: string;
//   emi: number | null;
//   interestRate?: string;
//   tenure?: string;
//   purpose?: string;
//   applicationId?: string;
// }

interface Notification {
  id: number;
  message: string;
  time: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
}

interface LoanScheme {
  id: string;
  title: string;
  description: string;
  interestRate: string;
  maxAmount: string;
  tenure: string;
  processingFee: string;
  eligibility: string;
  icon: React.ReactNode;
}

const EnhancedDashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  
  // Redux loan state
  const loanApplications = useSelector(selectLoans);
  const loanSchemes = useSelector(selectLoanSchemes);
  const loanLoading = useSelector(selectLoanLoading);
  const loanError = useSelector(selectLoanError);
  
  // Fetch loan data on component mount
  useEffect(() => {
    dispatch(fetchUserLoans());
    dispatch(fetchLoanSchemes());
  }, [dispatch]);
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const [activeTab, setActiveTab] = useState<'overview' | 'loans' | 'schemes'>('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  
  // User details - in a real app, more of this would come from API calls
  const [userDetails] = useState({
    name: user?.name || "John Doe",
    email: user?.email || "john.doe@example.com",
    creditScore: 742,
    profileComplete: 85
  });
  
  // Use Redux loan data if available, otherwise fallback to mock data
  const loans = loanApplications.length > 0 ? loanApplications : [
    { 
      id: "1", 
      userId: "user123",
      loanType: "Personal Loan", 
      amount: 50000, 
      tenure: 12,
      purpose: "Medical Expenses",
      status: "approved", 
      interestRate: 10.5,
      emi: 4200, 
      applicationDate: "2024-09-01",
      lastUpdated: "2024-09-02",
      documents: []
    },
    { 
      id: "2", 
      userId: "user123",
      loanType: "Emergency Loan", 
      amount: 25000, 
      tenure: 6,
      purpose: "Home Renovation",
      status: "pending", 
      interestRate: 12,
      emi: 0, 
      applicationDate: "2024-09-03",
      lastUpdated: "2024-09-03",
      documents: []
    },
    { 
      id: "3", 
      userId: "user123",
      loanType: "Business Loan", 
      amount: 75000, 
      tenure: 24,
      purpose: "Business Expansion",
      status: "rejected", 
      interestRate: 14,
      emi: 0, 
      applicationDate: "2024-08-28",
      lastUpdated: "2024-08-30",
      documents: []
    }
  ];

  const [notifications] = useState<Notification[]>([
    { id: 1, message: "Your loan application #LOAN-2024-002 is under review", time: "2 hours ago", type: "info", read: false },
    { id: 2, message: "EMI payment due in 3 days", time: "1 day ago", type: "warning", read: false },
    { id: 3, message: "KYC verification completed successfully", time: "2 days ago", type: "success", read: true }
  ]);

  // Use Redux loan schemes if available, otherwise fallback to mock data
  const availableLoanSchemes = useSelector(selectLoanSchemes).length > 0 ? useSelector(selectLoanSchemes) : [
    {
      id: 'personal',
      name: 'Personal Loan',
      description: 'Quick funds for your personal needs with minimal documentation',
      interestRate: 10.99,
      minAmount: 100000,
      maxAmount: 1500000,
      minTenure: 12,
      maxTenure: 60,
      processingFee: 1.5,
      eligibility: 'Salaried individuals with min. income of ₹25,000/month',
      documents: ['Identity Proof', 'Address Proof', 'Income Proof', 'Bank Statements'],
      features: ['Quick Approval', 'Minimal Documentation', 'Flexible Repayment Options']
    },
    {
      id: 'business',
      name: 'Business Loan',
      description: 'Expand your business with flexible repayment options',
      interestRate: 12.50,
      minAmount: 500000,
      maxAmount: 5000000,
      minTenure: 12,
      maxTenure: 84,
      processingFee: 2.0,
      eligibility: 'Business with 2+ years of operation',
      documents: ['Business Registration', 'GST Returns', 'Income Tax Returns', 'Bank Statements'],
      features: ['Flexible Repayment Options', 'No Collateral Required', 'Quick Disbursement']
    },
    {
      id: 'home',
      name: 'Home Loan',
      description: 'Realize your dream of owning a home with affordable EMIs',
      interestRate: 8.75,
      minAmount: 1000000,
      maxAmount: 20000000,
      minTenure: 60,
      maxTenure: 360,
      processingFee: 0.5,
      eligibility: 'Salaried/Self-employed with min. income of ₹40,000/month',
      documents: ['Identity Proof', 'Address Proof', 'Income Proof', 'Property Documents'],
      features: ['Competitive Interest Rates', 'Long Tenure Options', 'Quick Approval']
    }
  ];

  // Helper functions
  const getStatusIcon = (status: Loan['status']) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'disbursed':
        return <DollarSign className="w-5 h-5 text-blue-500" />;
      case 'closed':
        return <CheckCircle className="w-5 h-5 text-gray-500" />;
      default:
        return null;
    }
  };
  
  // Format currency for display
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-IN');
  };
  
  // Calculate EMI for a loan
  const getEMI = (principal: number, interestRate: number, tenure: number) => {
    // Use our utility function from loanCalculator.js
    return calculateEMI(principal, interestRate, tenure);
  };

  const getStatusColor = (status: Loan['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'disbursed':
        return 'bg-blue-100 text-blue-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return '';
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'info':
        return 'bg-blue-50 border-blue-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {userDetails.name}!</h1>
              <p className="text-gray-600">Here's your loan portfolio overview</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell 
                  className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800" 
                  onClick={() => setShowNotifications(!showNotifications)}
                />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                    {unreadCount}
                  </span>
                )}
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 border border-gray-200 overflow-hidden">
                    <div className="p-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                      <h3 className="font-medium text-gray-700">Notifications</h3>
                      <button className="text-xs text-blue-600 hover:text-blue-800">
                        Mark all as read
                      </button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`p-3 border-b border-gray-100 ${!notification.read ? 'bg-blue-50' : ''}`}
                        >
                          <p className="text-sm text-gray-900">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-2 bg-gray-50 text-center">
                      <button className="text-sm text-blue-600 hover:text-blue-800">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-2">
                <User className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">{userDetails.name}</span>
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
                <p className="text-sm text-blue-600">Your profile is {userDetails.profileComplete}% complete. Complete it to unlock better loan offers.</p>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Complete Now
            </button>
          </div>
          <div className="mt-3">
            <div className="bg-blue-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${userDetails.profileComplete}%` }}></div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('loans')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'loans' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              My Loans
            </button>
            <button
              onClick={() => setActiveTab('schemes')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'schemes' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Loan Schemes
            </button>
          </nav>
        </div>

        {/* Overview Tab Content */}
        {activeTab === 'overview' && (
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
                    <div className="bg-green-100 p-3 rounded-full">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Total Borrowed</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">₹{formatCurrency(50000)}</p>
                    <p className="text-blue-600 text-sm mt-1">Personal Loan</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <DollarSign className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
              </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm font-medium">Next EMI</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">₹{formatCurrency(4200)}</p>
                      <p className="text-yellow-600 text-sm mt-1">Due in 7 days</p>
                    </div>
                    <div className="bg-yellow-100 p-3 rounded-full">
                      <Calendar className="w-8 h-8 text-yellow-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Applications */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Applications</h2>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
                </div>
                <div className="space-y-4">
                  {loans.map((loan) => (
                    <div key={loan.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {getStatusIcon(loan.status)}
                          <div>
                            <p className="font-medium text-gray-900">{loan.type}</p>
                            <p className="text-sm text-gray-500">₹{formatCurrency(loan.amount)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(loan.status)}`}>
                            {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                          </span>
                          <p className="text-sm text-gray-500 mt-1">{loan.date}</p>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500">Application ID: {loan.applicationId}</p>
                          {loan.emi && <p className="text-sm font-medium text-gray-900">EMI: ₹{formatCurrency(loan.emi)}/month</p>}
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium">
                          View Details
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Credit Score */}
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-md p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Credit Score</h3>
                <div className="text-3xl font-bold">{userDetails.creditScore}</div>
                <div className="text-purple-200 text-sm">Excellent Score</div>
                <div className="bg-white bg-opacity-20 rounded-full h-2 mt-4">
                  <div className="bg-white h-2 rounded-full" style={{ width: `${(userDetails.creditScore / 850) * 100}%` }}></div>
                </div>
                <button className="mt-4 bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg text-sm hover:bg-opacity-30 transition-colors">
                  Improve Score
                </button>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link to="/apply" className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-all group">
                    <div className="flex items-center space-x-3">
                      <Plus className="w-8 h-8 text-blue-600 bg-blue-100 p-1 rounded-lg group-hover:bg-blue-200 transition-colors" />
                      <div className="text-left">
                        <span className="block text-sm font-semibold text-gray-900">Apply for Loan</span>
                        <span className="block text-xs text-gray-600">Quick application process</span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </Link>

                  <button className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all group w-full">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-8 h-8 text-green-600 bg-green-100 p-1 rounded-lg group-hover:bg-green-200 transition-colors" />
                      <div className="text-left">
                        <span className="block text-sm font-semibold text-gray-900">Upload Documents</span>
                        <span className="block text-xs text-gray-600">Update your files</span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </button>

                  <button className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all group w-full">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-8 h-8 text-purple-600 bg-purple-100 p-1 rounded-lg group-hover:bg-purple-200 transition-colors" />
                      <div className="text-left">
                        <span className="block text-sm font-semibold text-gray-900">Complete KYC</span>
                        <span className="block text-xs text-gray-600">Verify your identity</span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </button>

                  <button className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all group w-full">
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
        )}

        {/* My Loans Tab Content */}
        {activeTab === 'loans' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">My Loan Applications</h2>
              <div className="flex space-x-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search applications"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </button>
                <Link to="/apply" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  New Application
                </Link>
              </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {loans.map((loan) => (
                  <li key={loan.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`p-2 rounded-full ${getStatusColor(loan.status)}`}>
                            {getStatusIcon(loan.status)}
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">{loan.type}</p>
                            <p className="text-sm text-gray-500">₹{formatCurrency(loan.amount)}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(loan.status)}`}>
                            {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                          </span>
                          <ChevronRight className="ml-4 h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            <FileText className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                            {loan.applicationId}
                          </p>
                          {loan.purpose && (
                            <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                              <Briefcase className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                              {loan.purpose}
                            </p>
                          )}
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          <p>
                            Applied on <time dateTime={loan.date}>{loan.date}</time>
                          </p>
                        </div>
                      </div>
                      {loan.status === 'approved' && (
                        <div className="mt-2 border-t border-gray-200 pt-2">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm text-gray-500">EMI: <span className="font-medium text-gray-900">₹{formatCurrency(loan.emi)}/month</span></p>
                              <p className="text-sm text-gray-500">Interest Rate: <span className="font-medium text-gray-900">{loan.interestRate}</span></p>
                            </div>
                            <div>
                              <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                                <Download className="h-3.5 w-3.5 mr-1" />
                                Download Agreement
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Loan Schemes Tab Content */}
        {activeTab === 'schemes' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Available Loan Schemes</h2>
              <div className="flex space-x-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search schemes"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableLoanSchemes.map((scheme) => (
                <div key={scheme.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-blue-100 p-3 rounded-full">
                        {scheme.id === 'personal' && <User className="h-6 w-6 text-blue-500" />}
                        {scheme.id === 'business' && <Briefcase className="h-6 w-6 text-purple-500" />}
                        {scheme.id === 'home' && <Home className="h-6 w-6 text-green-500" />}
                      </div>
                      <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        {scheme.interestRate}%
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{scheme.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{scheme.description}</p>
                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Loan Amount:</span>
                        <span className="font-medium text-gray-900">₹{formatCurrency(scheme.minAmount)} - ₹{formatCurrency(scheme.maxAmount)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Tenure:</span>
                        <span className="font-medium text-gray-900">{scheme.minTenure} - {scheme.maxTenure} months</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Processing Fee:</span>
                        <span className="font-medium text-gray-900">{scheme.processingFee}%</span>
                      </div>
                    </div>
                    <Link 
                      to={`/apply?scheme=${scheme.id}`}
                      className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-lg transition-colors font-medium"
                    >
                      Apply Now
                    </Link>
                  </div>
                  <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                    <p className="text-xs text-gray-500"><span className="font-medium">Eligibility:</span> {scheme.eligibility}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedDashboard;