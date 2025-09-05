import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  Users,
  FileText,
  Building2,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Activity,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Plus,
  Filter,
  Search,
  Eye,
  Edit,
  MoreHorizontal,
  Download,
  BarChart3,
  Shield,
  Calendar,
  Bell,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('7d');

  const platformStats = [
    {
      name: 'Total Users',
      value: '0',
      change: 'Platform ready',
      changeType: 'neutral',
      icon: Users,
      href: '/admin/users',
    },
    {
      name: 'Loan Applications',
      value: '0',
      change: 'Awaiting first application',
      changeType: 'neutral',
      icon: FileText,
      href: '/admin/loans',
    },
    {
      name: 'Active Schemes',
      value: '0',
      change: 'Create your first scheme',
      changeType: 'neutral',
      icon: Building2,
      href: '/admin/schemes',
    },
    {
      name: 'Total Disbursed',
      value: '₹0',
      change: 'Ready for business',
      changeType: 'neutral',
      icon: DollarSign,
      href: '/admin/analytics',
    },
  ];

  const recentActivity = [
    {
      id: '1',
      type: 'system',
      title: 'Admin account created',
      description: 'Your administrator account has been successfully set up',
      timestamp: new Date().toISOString(),
      user: user?.fullName,
    },
    {
      id: '2',
      type: 'system',
      title: 'Platform initialized',
      description: 'Fin-Agentix platform is ready for configuration',
      timestamp: new Date().toISOString(),
      user: 'System',
    },
  ];

  const pendingTasks = [
    {
      id: '1',
      title: 'Create First Loan Scheme',
      description: 'Set up your first loan product to start accepting applications',
      priority: 'high',
      href: '/admin/schemes/create',
    },
    {
      id: '2',
      title: 'Configure Compliance Settings',
      description: 'Set up RBI compliance parameters and risk assessment rules',
      priority: 'high',
      href: '/admin/compliance',
    },
    {
      id: '3',
      title: 'Invite Team Members',
      description: 'Add team members and assign appropriate permissions',
      priority: 'medium',
      href: '/admin/users/invite',
    },
    {
      id: '4',
      title: 'Set Up Analytics Dashboard',
      description: 'Configure monitoring and reporting preferences',
      priority: 'low',
      href: '/admin/analytics/setup',
    },
  ];

  const sectorStatus = [
    { name: 'Personal Loans', schemes: 0, applications: 0, status: 'inactive' },
    { name: 'Home Loans', schemes: 0, applications: 0, status: 'inactive' },
    { name: 'Vehicle Loans', schemes: 0, applications: 0, status: 'inactive' },
    { name: 'Business Loans', schemes: 0, applications: 0, status: 'inactive' },
    { name: 'Education Loans', schemes: 0, applications: 0, status: 'inactive' },
    { name: 'Agriculture Loans', schemes: 0, applications: 0, status: 'inactive' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Welcome, {user?.fullName?.split(' ')[0]}
            </h1>
            <p className="text-purple-100">
              Manage your lending platform and monitor business performance from this central hub.
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm text-purple-100">Organization</p>
              <p className="font-semibold">{user?.organizationDetails?.name}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm text-purple-100">Status</p>
              <p className="font-semibold">Active</p>
            </div>
          </div>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">Platform Overview</h2>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="form-input w-auto"
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button className="btn btn-ghost">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Platform Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {platformStats.map((stat) => (
          <Link
            key={stat.name}
            to={stat.href}
            className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all group"
          >
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
              <div className="p-3 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
                <stat.icon className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Tasks */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Setup Tasks</h2>
              <span className="text-sm text-slate-500">{pendingTasks.length} pending</span>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {pendingTasks.map((task) => (
                <div key={task.id} className="flex items-start justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-medium text-slate-900">{task.title}</h3>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">{task.description}</p>
                  </div>
                  <Link
                    to={task.href}
                    className="btn btn-ghost btn-sm ml-4"
                  >
                    Start
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Activity className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900 text-sm">{activity.title}</p>
                    <p className="text-xs text-slate-500">{activity.description}</p>
                    <p className="text-xs text-slate-400 mt-1">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sector Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Sector Overview</h2>
            <Link to="/admin/sectors" className="btn btn-ghost">
              Manage All Sectors
            </Link>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sectorStatus.map((sector) => (
              <div key={sector.name} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-slate-900">{sector.name}</h3>
                  <span className={`w-2 h-2 rounded-full ${
                    sector.status === 'active' ? 'bg-green-500' : 'bg-slate-300'
                  }`}></span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-500">Schemes</p>
                    <p className="font-semibold text-slate-900">{sector.schemes}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Applications</p>
                    <p className="font-semibold text-slate-900">{sector.applications}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Setup Guide */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start space-x-4">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-blue-900 mb-2">Platform Setup Required</h3>
            <p className="text-blue-800 mb-4">
              Complete these essential steps to activate your lending platform and start accepting loan applications.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/admin/schemes/create" className="flex items-center p-3 bg-white rounded-lg border border-blue-200 hover:border-blue-300 transition-colors">
                <Plus className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="font-medium text-blue-900">Create Loan Schemes</p>
                  <p className="text-sm text-blue-700">Set up loan products for different sectors</p>
                </div>
              </Link>
              <Link to="/admin/compliance" className="flex items-center p-3 bg-white rounded-lg border border-blue-200 hover:border-blue-300 transition-colors">
                <Shield className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="font-medium text-blue-900">Configure Compliance</p>
                  <p className="text-sm text-blue-700">Set up RBI compliance and risk parameters</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;