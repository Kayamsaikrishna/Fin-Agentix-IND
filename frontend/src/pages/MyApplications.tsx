import React, { useState } from 'react';
import {
  Search,
  Filter,
  Eye,
  Download,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  Calendar,
  DollarSign,
  TrendingUp,
  User,
  Home,
  Car,
  Briefcase,
  GraduationCap,
  RefreshCw,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Application {
  id: string;
  loanType: string;
  amount: number;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'disbursed';
  appliedDate: string;
  lastUpdated: string;
  emi?: number;
  tenure: number;
  interestRate?: number;
  purpose: string;
  icon: React.ElementType;
}

const MyApplications: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [applications, setApplications] = useState<Application[]>([
    // Sample data - will be replaced with API data
  ]);

  const stats = [
    {
      name: 'Total Applications',
      value: applications.length.toString(),
      icon: FileText,
      color: 'bg-blue-600',
    },
    {
      name: 'Approved',
      value: applications.filter(app => app.status === 'approved').length.toString(),
      icon: CheckCircle2,
      color: 'bg-green-600',
    },
    {
      name: 'Under Review',
      value: applications.filter(app => app.status === 'under_review').length.toString(),
      icon: Clock,
      color: 'bg-yellow-600',
    },
    {
      name: 'Total Applied Amount',
      value: `₹${(applications.reduce((sum, app) => sum + app.amount, 0) / 100000).toFixed(1)}L`,
      icon: DollarSign,
      color: 'bg-purple-600',
    },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'approved':
        return { color: 'text-green-600 bg-green-100', icon: CheckCircle2, text: 'Approved' };
      case 'under_review':
        return { color: 'text-yellow-600 bg-yellow-100', icon: Clock, text: 'Under Review' };
      case 'rejected':
        return { color: 'text-red-600 bg-red-100', icon: XCircle, text: 'Rejected' };
      case 'disbursed':
        return { color: 'text-blue-600 bg-blue-100', icon: TrendingUp, text: 'Disbursed' };
      case 'submitted':
        return { color: 'text-blue-600 bg-blue-100', icon: FileText, text: 'Submitted' };
      case 'draft':
        return { color: 'text-slate-600 bg-slate-100', icon: AlertTriangle, text: 'Draft' };
      default:
        return { color: 'text-slate-600 bg-slate-100', icon: AlertTriangle, text: 'Unknown' };
    }
  };

  const getLoanTypeIcon = (loanType: string) => {
    switch (loanType.toLowerCase()) {
      case 'personal': return User;
      case 'home': return Home;
      case 'vehicle': return Car;
      case 'business': return Briefcase;
      case 'education': return GraduationCap;
      default: return FileText;
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.loanType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Loan Applications</h1>
          <p className="text-slate-600 mt-1">Track and manage your loan applications</p>
        </div>
        <Link to="/loans/apply" className="btn btn-primary">
          <FileText className="w-4 h-4 mr-2" />
          New Application
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">{stat.name}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="form-input w-auto"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="submitted">Submitted</option>
              <option value="under_review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="disbursed">Disbursed</option>
            </select>
            <button className="btn btn-ghost">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>

        {/* Applications List */}
        <div className="p-6">
          {filteredApplications.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                {applications.length === 0 ? 'No applications yet' : 'No applications found'}
              </h3>
              <p className="text-slate-600 mb-4">
                {applications.length === 0 
                  ? 'Start your financial journey by applying for a loan'
                  : 'Try adjusting your search or filters'
                }
              </p>
              {applications.length === 0 && (
                <Link to="/loans/apply" className="btn btn-primary">
                  Apply for Loan
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredApplications.map((application) => {
                const statusConfig = getStatusConfig(application.status);
                const LoanIcon = getLoanTypeIcon(application.loanType);
                
                return (
                  <div key={application.id} className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <LoanIcon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-slate-900">{application.loanType} Loan</h3>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.color}`}>
                              <statusConfig.icon className="w-3 h-3 mr-1" />
                              {statusConfig.text}
                            </span>
                          </div>
                          <p className="text-slate-600 mb-2">{application.purpose}</p>
                          <div className="flex items-center space-x-6 text-sm text-slate-500">
                            <span className="flex items-center">
                              <DollarSign className="w-4 h-4 mr-1" />
                              ₹{application.amount.toLocaleString()}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {application.tenure} months
                            </span>
                            {application.emi && (
                              <span className="flex items-center">
                                <TrendingUp className="w-4 h-4 mr-1" />
                                EMI: ₹{application.emi.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Link
                          to={`/loans/application/${application.id}`}
                          className="btn btn-ghost btn-sm"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Link>
                        <button className="btn btn-ghost btn-sm">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">
                          Applied on {new Date(application.appliedDate).toLocaleDateString()}
                        </span>
                        <span className="text-slate-500">
                          Last updated {new Date(application.lastUpdated).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyApplications;