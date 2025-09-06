import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  AlertCircle,
  BarChart4,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Building,
  Search,
  LogOut,
  BookOpen
} from 'lucide-react';
import { getAdminStats, getRecentApplications, getSectorPerformance } from '../../api/mock';
import { AdminStats, RecentApplication, SectorPerformance } from '../../types/admin';
import { useAuth } from '../../contexts/AuthContext';

const AdminDashboard: React.FC = () => {
  const { logout } = useAuth();
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('monthly');
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [recentApplications, setRecentApplications] = useState<RecentApplication[]>([]);
  const [sectorPerformance, setSectorPerformance] = useState<SectorPerformance[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [statsData, recentAppsData, sectorPerfData] = await Promise.all([
        getAdminStats(),
        getRecentApplications(),
        getSectorPerformance(),
      ]);
      setStats(statsData);
      setRecentApplications(recentAppsData);
      setSectorPerformance(sectorPerfData);
    };

    fetchData();
  }, []);

  const getStatusIcon = (status: string) => {
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

  const getStatusColor = (status: string) => {
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

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? 
      <ArrowUpRight className="w-4 h-4 text-green-500" /> : 
      <ArrowDownRight className="w-4 h-4 text-red-500" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage loan applications and monitor performance</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search applications..."
                className="form-input pl-10 pr-4 py-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
            <select 
              className="form-input py-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={period}
              onChange={(e) => setPeriod(e.target.value as any)}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
            <button onClick={logout} className="p-2 rounded-full hover:bg-gray-100">
              <LogOut className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Applications</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalApplications}</p>
                </div>
                <FileText className="w-10 h-10 text-blue-500" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Approved Loans</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.approvedLoans}</p>
                </div>
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Pending Reviews</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pendingReviews}</p>
                </div>
                <Clock className="w-10 h-10 text-yellow-500" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Disbursed</p>
                  <p className="text-2xl font-bold text-gray-900">₹{(stats.totalDisbursed / 100000).toFixed(1)}L</p>
                </div>
                <DollarSign className="w-10 h-10 text-purple-500" />
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Applications</h2>
              <Link to="/admin/loans" className="text-blue-600 text-sm font-medium hover:text-blue-800">View All</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">ID</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Applicant</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Amount</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Sector</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentApplications.map((app) => (
                    <tr key={app.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">{app.id}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{app.applicant}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">₹{app.amount.toLocaleString()}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{app.sector}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                          {getStatusIcon(app.status)}
                          <span className="ml-1 capitalize">{app.status}</span>
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">{new Date(app.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">User Management</h2>
                <Link to="/admin/users" className="text-blue-600 text-sm font-medium hover:text-blue-800">View All</Link>
              </div>
              <div className="flex items-center">
                <Users className="w-10 h-10 text-indigo-500" />
                <div className="ml-4">
                  <p className="text-gray-500 text-sm">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{stats?.totalApplications || 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Loan Schemes</h2>
                <Link to="/admin/schemes" className="text-blue-600 text-sm font-medium hover:text-blue-800">Manage</Link>
              </div>
              <div className="flex items-center">
                <BookOpen className="w-10 h-10 text-teal-500" />
                <div className="ml-4">
                  <p className="text-gray-500 text-sm">Active Schemes</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Sector Performance</h2>
                <button className="text-blue-600 text-sm font-medium hover:text-blue-800">Details</button>
              </div>
              <div className="space-y-4">
                {sectorPerformance.map((sector) => (
                  <div key={sector.sector} className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-gray-900">{sector.sector}</h3>
                      <div className="flex items-center">
                        {getGrowthIcon(sector.growth)}
                        <span className={`text-sm font-medium ${sector.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {Math.abs(sector.growth)}%
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <p className="text-gray-500">Applications</p>
                        <p className="font-medium text-gray-900">{sector.applications}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Approved</p>
                        <p className="font-medium text-gray-900">{sector.approved}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Disbursed</p>
                        <p className="font-medium text-gray-900">₹{(sector.disbursed / 100000).toFixed(1)}L</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
