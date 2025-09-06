import React, { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  Building2,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface LoanScheme {
  id: string;
  name: string;
  category: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  interestRate: number;
  maxTenure: number;
  eligibility: string[];
  isActive: boolean;
  applicationsCount: number;
  approvalRate: number;
  createdAt: string;
  updatedAt: string;
}

const SchemeManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [schemes, setSchemes] = useState<LoanScheme[]>([]);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'personal', label: 'Personal Loans' },
    { value: 'home', label: 'Home Loans' },
    { value: 'vehicle', label: 'Vehicle Loans' },
    { value: 'business', label: 'Business Loans' },
    { value: 'education', label: 'Education Loans' },
    { value: 'agriculture', label: 'Agriculture Loans' },
    { value: 'gold', label: 'Gold Loans' },
    { value: 'microfinance', label: 'Microfinance' },
    { value: 'credit_card', label: 'Credit Cards' },
    { value: 'two_wheeler', label: 'Two Wheeler' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'digital', label: 'Digital Loans' },
  ];

  const stats = [
    {
      name: 'Total Schemes',
      value: schemes.length.toString(),
      icon: Building2,
      color: 'bg-blue-600',
    },
    {
      name: 'Active Schemes',
      value: schemes.filter(s => s.isActive).length.toString(),
      icon: CheckCircle2,
      color: 'bg-green-600',
    },
    {
      name: 'Total Applications',
      value: schemes.reduce((sum, s) => sum + s.applicationsCount, 0).toString(),
      icon: Users,
      color: 'bg-purple-600',
    },
    {
      name: 'Avg Approval Rate',
      value: schemes.length > 0 
        ? `${Math.round(schemes.reduce((sum, s) => sum + s.approvalRate, 0) / schemes.length)}%`
        : '0%',
      icon: TrendingUp,
      color: 'bg-orange-600',
    },
  ];

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || scheme.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && scheme.isActive) ||
                         (filterStatus === 'inactive' && !scheme.isActive);
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleToggleStatus = (schemeId: string) => {
    setSchemes(prev => prev.map(scheme => 
      scheme.id === schemeId 
        ? { ...scheme, isActive: !scheme.isActive }
        : scheme
    ));
  };

  const handleDeleteScheme = (schemeId: string) => {
    if (window.confirm('Are you sure you want to delete this scheme?')) {
      setSchemes(prev => prev.filter(scheme => scheme.id !== schemeId));
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Scheme Management</h1>
          <p className="text-slate-600 mt-1">Create and manage loan schemes across different sectors</p>
        </div>
        <Link to="/admin/schemes/create" className="btn btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Create New Scheme
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
                placeholder="Search schemes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="form-input w-auto"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="form-input w-auto"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Schemes List */}
        <div className="p-6">
          {filteredSchemes.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">No schemes found</h3>
              <p className="text-slate-600 mb-4">
                {searchTerm || filterCategory !== 'all' || filterStatus !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Create your first loan scheme to get started'
                }
              </p>
              {!searchTerm && filterCategory === 'all' && filterStatus === 'all' && (
                <Link to="/admin/schemes/create" className="btn btn-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Scheme
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredSchemes.map((scheme) => (
                <div key={scheme.id} className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-slate-900">{scheme.name}</h3>
                      <p className="text-sm text-slate-600 capitalize">{scheme.category} Loan</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        scheme.isActive 
                          ? 'text-green-600 bg-green-100' 
                          : 'text-slate-600 bg-slate-100'
                      }`}>
                        {scheme.isActive ? 'Active' : 'Inactive'}
                      </span>
                      <div className="relative">
                        <button className="p-1 text-slate-400 hover:text-slate-600">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 mb-4">{scheme.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-slate-500">Amount Range</p>
                      <p className="font-medium text-slate-900">
                        {formatCurrency(scheme.minAmount)} - {formatCurrency(scheme.maxAmount)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Interest Rate</p>
                      <p className="font-medium text-slate-900">{scheme.interestRate}% p.a.</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Max Tenure</p>
                      <p className="font-medium text-slate-900">{scheme.maxTenure} months</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Applications</p>
                      <p className="font-medium text-slate-900">{scheme.applicationsCount}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleToggleStatus(scheme.id)}
                        className={`btn btn-sm ${scheme.isActive ? 'btn-ghost' : 'btn-primary'}`}
                      >
                        {scheme.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <Link to={`/admin/schemes/${scheme.id}/edit`} className="btn btn-ghost btn-sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Link>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Link to={`/admin/schemes/${scheme.id}`} className="text-slate-400 hover:text-slate-600">
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDeleteScheme(scheme.id)}
                        className="text-slate-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchemeManagement;