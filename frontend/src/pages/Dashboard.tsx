import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Users,
  FileText,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Briefcase,
  Home,
  Car,
  GraduationCap,
  Calculator,
  User,
  Building2,
  BarChart3,
  Shield,
  Activity,
  Eye,
  Download,
  Plus,
  Filter,
  Search,
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (user?.role === 'admin') {
    return <AdminDashboard />;
  }

  return <UserDashboard />;
};

const UserDashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      name: 'Active Loans',
      value: '0',
      change: 'No active loans',
      changeType: 'neutral',
      icon: FileText,
    },
    {
      name: 'Total Applied',
      value: '₹0',
      change: 'Start your journey',
      changeType: 'neutral',
      icon: DollarSign,
    },
    {
      name: 'Credit Score',
      value: 'N/A',
      change: 'Complete KYC first',
      changeType: 'neutral',
      icon: TrendingUp,
    },
    {
      name: 'Profile Status',
      value: user?.profileComplete ? 'Complete' : 'Incomplete',
      change: user?.kycStatus || 'Pending',
      changeType: user?.profileComplete ? 'positive' : 'negative',
      icon: User,
    },
  ];

  const quickActions = [
    { name: 'Apply for Loan', href: '/loans/apply', icon: FileText, color: 'bg-blue-600', description: 'Start a new loan application' },
    { name: 'Complete Profile', href: '/profile', icon: User, color: 'bg-green-600', description: 'Complete your profile for better offers' },
    { name: 'Upload Documents', href: '/documents', icon: FileText, color: 'bg-purple-600', description: 'Upload required documents' },
    { name: 'EMI Calculator', href: '/calculator', icon: Calculator, color: 'bg-orange-600', description: 'Calculate your EMI' },
  ];

  const loanTypes = [
    { name: 'Personal Loan', icon: User, amount: '₹50K - ₹15L', rate: '10.5% onwards' },
    { name: 'Home Loan', icon: Home, amount: '₹5L - ₹5Cr', rate: '8.5% onwards' },
    { name: 'Vehicle Loan', icon: Car, amount: '₹1L - ₹50L', rate: '9.5% onwards' },
    { name: 'Education Loan', icon: GraduationCap, amount: '₹1L - ₹1Cr', rate: '9.0% onwards' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Welcome to Fin-Agentix, {user?.fullName?.split(' ')[0]}!
            </h1>
            <p className="text-blue-100">
              Your journey to financial freedom starts here. Explore our AI-powered lending solutions.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm text-blue-100">KYC Status</p>
              <p className="font-semibold">{user?.kycStatus || 'Pending'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">{stat.name}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                <p className={`text-sm mt-1 flex items-center ${
                  stat.changeType === 'positive' ? 'text-green-600' : 
                  stat.changeType === 'negative' ? 'text-red-600' : 'text-slate-500'
                }`}>
                  {stat.changeType === 'positive' && <ArrowUpRight className="w-4 h-4 mr-1" />}
                  {stat.changeType === 'negative' && <ArrowDownRight className="w-4 h-4 mr-1" />}
                  {stat.change}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Quick Actions</h2>
            <p className="text-sm text-slate-600 mt-1">Get started with these essential actions</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action) => (
                <Link
                  key={action.name}
                  to={action.href}
                  className="flex items-start p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
                >
                  <div className={`p-3 rounded-lg ${action.color} group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-slate-700 group-hover:text-blue-700">
                      {action.name}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">{action.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Loan Types */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Popular Loans</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {loanTypes.map((loan) => (
                <div key={loan.name} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <loan.icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 text-sm">{loan.name}</p>
                      <p className="text-xs text-slate-500">{loan.amount}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-green-600">{loan.rate}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/loans/apply"
              className="block w-full mt-4 text-center py-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              View All Loan Types →
            </Link>
          </div>
        </div>
      </div>

      {/* Getting Started Guide */}
      {!user?.profileComplete && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Complete Your Profile</h2>
            <p className="text-sm text-slate-600 mt-1">Follow these steps to unlock all features</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-medium text-slate-900">Complete KYC</h3>
                <p className="text-sm text-slate-600 mt-1">Verify your identity with Aadhaar and PAN</p>
                <Link to="/profile" className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2 inline-block">
                  Start KYC →
                </Link>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-medium text-slate-900">Upload Documents</h3>
                <p className="text-sm text-slate-600 mt-1">Upload income and address proof documents</p>
                <Link to="/documents" className="text-green-600 hover:text-green-700 text-sm font-medium mt-2 inline-block">
                  Upload Now →
                </Link>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CreditCard className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-medium text-slate-900">Apply for Loan</h3>
                <p className="text-sm text-slate-600 mt-1">Choose from 12 different loan types</p>
                <Link to="/loans/apply" className="text-purple-600 hover:text-purple-700 text-sm font-medium mt-2 inline-block">
                  Apply Now →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  const stats = [
    {
      name: 'Total Applications',
      value: '0',
      change: 'No applications yet',
      changeType: 'neutral',
      icon: FileText,
    },
    {
      name: 'Active Schemes',
      value: '0',
      change: 'Create your first scheme',
      changeType: 'neutral',
      icon: Building2,
    },
    {
      name: 'Registered Users',
      value: '0',
      change: 'Platform ready for users',
      changeType: 'neutral',
      icon: Users,
    },
    {
      name: 'System Status',
      value: 'Active',
      change: 'All systems operational',
      changeType: 'positive',
      icon: Activity,
    },
  ];

  const adminActions = [
    { name: 'Create Loan Scheme', href: '/admin/schemes/create', icon: Plus, color: 'bg-blue-600', description: 'Set up new loan products' },
    { name: 'Manage Users', href: '/admin/users', icon: Users, color: 'bg-green-600', description: 'View and manage user accounts' },
    { name: 'View Analytics', href: '/admin/analytics', icon: BarChart3, color: 'bg-purple-600', description: 'Monitor platform performance' },
    { name: 'Compliance Center', href: '/admin/compliance', icon: Shield, color: 'bg-orange-600', description: 'Ensure regulatory compliance' },
  ];

  const sectorOverview = [
    { name: 'Personal Loans', applications: 0, schemes: 0, icon: User },
    { name: 'Home Loans', applications: 0, schemes: 0, icon: Home },
    { name: 'Vehicle Loans', applications: 0, schemes: 0, icon: Car },
    { name: 'Business Loans', applications: 0, schemes: 0, icon: Briefcase },
    { name: 'Education Loans', applications: 0, schemes: 0, icon: GraduationCap },
    { name: 'Agriculture Loans', applications: 0, schemes: 0, icon: Leaf },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-purple-100">
              Welcome to the Fin-Agentix administration panel. Manage schemes, users, and monitor platform performance.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm text-purple-100">Organization</p>
              <p className="font-semibold">{user?.organizationDetails?.name || 'Fin-Agentix India'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">{stat.name}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                <p className={`text-sm mt-1 flex items-center ${
                  stat.changeType === 'positive' ? 'text-green-600' : 
                  stat.changeType === 'negative' ? 'text-red-600' : 'text-slate-500'
                }`}>
                  {stat.changeType === 'positive' && <ArrowUpRight className="w-4 h-4 mr-1" />}
                  {stat.changeType === 'negative' && <ArrowDownRight className="w-4 h-4 mr-1" />}
                  {stat.change}
                </p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <stat.icon className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Admin Actions */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Admin Actions</h2>
            <p className="text-sm text-slate-600 mt-1">Manage your lending platform</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {adminActions.map((action) => (
                <Link
                  key={action.name}
                  to={action.href}
                  className="flex items-start p-4 rounded-lg border border-slate-200 hover:border-purple-300 hover:bg-purple-50 transition-all group"
                >
                  <div className={`p-3 rounded-lg ${action.color} group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-slate-700 group-hover:text-purple-700">
                      {action.name}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">{action.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Sector Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Sector Overview</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {sectorOverview.map((sector) => (
                <div key={sector.name} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-slate-100 rounded-lg">
                      <sector.icon className="w-4 h-4 text-slate-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 text-sm">{sector.name}</p>
                      <p className="text-xs text-slate-500">{sector.applications} applications</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-slate-600">{sector.schemes} schemes</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/admin/sectors"
              className="block w-full mt-4 text-center py-2 text-purple-600 hover:text-purple-700 font-medium text-sm"
            >
              Manage All Sectors →
            </Link>
          </div>
        </div>
      </div>

      {/* Getting Started Guide for Admins */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Platform Setup Guide</h2>
          <p className="text-sm text-slate-600 mt-1">Complete these steps to activate your lending platform</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-medium text-slate-900">Create Schemes</h3>
              <p className="text-sm text-slate-600 mt-1">Set up loan products for different sectors</p>
              <Link to="/admin/schemes/create" className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2 inline-block">
                Create Scheme →
              </Link>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-medium text-slate-900">Configure Compliance</h3>
              <p className="text-sm text-slate-600 mt-1">Set up RBI compliance and risk parameters</p>
              <Link to="/admin/compliance" className="text-green-600 hover:text-green-700 text-sm font-medium mt-2 inline-block">
                Configure →
              </Link>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-medium text-slate-900">Invite Team</h3>
              <p className="text-sm text-slate-600 mt-1">Add team members and set permissions</p>
              <Link to="/admin/users/invite" className="text-purple-600 hover:text-purple-700 text-sm font-medium mt-2 inline-block">
                Invite Team →
              </Link>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-medium text-slate-900">Monitor Analytics</h3>
              <p className="text-sm text-slate-600 mt-1">Track performance and generate reports</p>
              <Link to="/admin/analytics" className="text-orange-600 hover:text-orange-700 text-sm font-medium mt-2 inline-block">
                View Analytics →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;