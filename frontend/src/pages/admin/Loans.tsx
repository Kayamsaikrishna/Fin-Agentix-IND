import React, { useState, useEffect } from 'react';
import { getLoans } from '../../api/mock';
import { Loan } from '../../types/dashboard';
import { CheckCircle, Clock, XCircle, Filter, Search } from 'lucide-react';

const AdminLoans: React.FC = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [filteredLoans, setFilteredLoans] = useState<Loan[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchLoans = async () => {
      const loansData = await getLoans();
      setLoans(loansData);
      setFilteredLoans(loansData);
    };

    fetchLoans();
  }, []);

  useEffect(() => {
    let result = loans;

    if (statusFilter !== 'all') {
      result = result.filter(loan => loan.status === statusFilter);
    }

    if (searchQuery) {
      result = result.filter(loan => 
        loan.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loan.sector.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredLoans(result);
  }, [statusFilter, searchQuery, loans]);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'approved':
        return { icon: <CheckCircle className="w-5 h-5 text-green-500" />, color: 'bg-green-100 text-green-800' };
      case 'rejected':
        return { icon: <XCircle className="w-5 h-5 text-red-500" />, color: 'bg-red-100 text-red-800' };
      case 'under_review':
        return { icon: <Clock className="w-5 h-5 text-yellow-500" />, color: 'bg-yellow-100 text-yellow-800' };
      case 'pending':
      default:
        return { icon: <Clock className="w-5 h-5 text-blue-500" />, color: 'bg-blue-100 text-blue-800' };
    }
  };

  const handleApprove = (id: string) => {
    // In a real app, you would make an API call to update the loan status
    console.log(`Approving loan ${id}`);
  };

  const handleReject = (id: string) => {
    // In a real app, you would make an API call to update the loan status
    console.log(`Rejecting loan ${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Manage Loan Applications</h1>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Search by ID or sector"
                  className="form-input pl-10 pr-4 py-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select 
                  className="form-input pl-10 pr-4 py-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="under_review">Under Review</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Application ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Sector</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Application Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLoans.map((loan) => (
                  <tr key={loan.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900">{loan.id}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{loan.sector}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">₹{loan.amount.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusInfo(loan.status).color}`}>
                        {getStatusInfo(loan.status).icon}
                        <span className="ml-1 capitalize">{loan.status.replace('_', ' ')}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">{new Date(loan.applicationDate).toLocaleDateString()}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleApprove(loan.id)}
                          className="p-2 rounded-md bg-green-100 text-green-800 hover:bg-green-200"
                          disabled={loan.status === 'approved'}
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleReject(loan.id)}
                          className="p-2 rounded-md bg-red-100 text-red-800 hover:bg-red-200"
                          disabled={loan.status === 'rejected'}
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      </div>
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
};

export default AdminLoans;
