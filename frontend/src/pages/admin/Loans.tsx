import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  XCircle, 
  AlertCircle,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  FileText,
  Calendar,
  User,
  DollarSign
} from 'lucide-react';

interface Loan {
  id: string;
  applicantName: string;
  applicantId: string;
  amount: number;
  sector: string;
  status: 'approved' | 'pending' | 'rejected' | 'disbursed' | 'closed';
  applicationDate: string;
  lastUpdated: string;
  interestRate?: number;
  tenure?: number;
  emi?: number;
  disbursementDate?: string;
}

const AdminLoans: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sectorFilter, setSectorFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<{start: string, end: string}>({start: '', end: ''});
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [showLoanDetails, setShowLoanDetails] = useState(false);

  // Sample loan data
  const loans: Loan[] = [
    {
      id: 'LOAN-2024-0145',
      applicantName: 'Rahul Sharma',
      applicantId: 'USR-2024-0089',
      amount: 150000,
      sector: 'Personal Loan',
      status: 'pending',
      applicationDate: '2024-09-05',
      lastUpdated: '2024-09-05',
    },
    {
      id: 'LOAN-2024-0144',
      applicantName: 'Priya Patel',
      applicantId: 'USR-2024-0076',
      amount: 500000,
      sector: 'Home Loan',
      status: 'approved',
      applicationDate: '2024-09-04',
      lastUpdated: '2024-09-06',
      interestRate: 8.5,
      tenure: 60,
      emi: 10250,
    },
    {
      id: 'LOAN-2024-0143',
      applicantName: 'Amit Singh',
      applicantId: 'USR-2024-0054',
      amount: 75000,
      sector: 'Two-Wheeler Loan',
      status: 'rejected',
      applicationDate: '2024-09-03',
      lastUpdated: '2024-09-04',
    },
    {
      id: 'LOAN-2024-0142',
      applicantName: 'Neha Gupta',
      applicantId: 'USR-2024-0067',
      amount: 200000,
      sector: 'Education Loan',
      status: 'disbursed',
      applicationDate: '2024-09-02',
      lastUpdated: '2024-09-07',
      interestRate: 7.5,
      tenure: 36,
      emi: 6200,
      disbursementDate: '2024-09-07',
    },
    {
      id: 'LOAN-2024-0141',
      applicantName: 'Vikram Reddy',
      applicantId: 'USR-2024-0045',
      amount: 350000,
      sector: 'Business Loan',
      status: 'closed',
      applicationDate: '2024-08-15',
      lastUpdated: '2024-09-01',
      interestRate: 12.5,
      tenure: 24,
      emi: 16500,
      disbursementDate: '2024-08-20',
    },
  ];

  const sectors = [
    'All Sectors',
    'Personal Loan',
    'Home Loan',
    'Vehicle Loan',
    'Two-Wheeler Loan',
    'Education Loan',
    'Business Loan',
    'Gold Loan',
    'Microfinance',
    'Credit Cards',
    'Healthcare Loan',
    'Digital Loan'
  ];

  const getStatusIcon = (status: string) => {
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
      case 'disbursed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'closed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleViewLoan = (loan: Loan) => {
    setSelectedLoan(loan);
    setShowLoanDetails(true);
  };

  const filteredLoans = loans.filter(loan => {
    // Apply search filter
    const matchesSearch = searchTerm === '' || 
      loan.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.applicantId.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply status filter
    const matchesStatus = statusFilter === 'all' || loan.status === statusFilter;
    
    // Apply sector filter
    const matchesSector = sectorFilter === 'all' || loan.sector === sectorFilter;
    
    // Apply date range filter
    const matchesDateRange = 
      (dateRange.start === '' || new Date(loan.applicationDate) >= new Date(dateRange.start)) &&
      (dateRange.end === '' || new Date(loan.applicationDate) <= new Date(dateRange.end));
    
    return matchesSearch && matchesStatus && matchesSector && matchesDateRange;
  });

  // Pagination
  const loansPerPage = 10;
  const totalPages = Math.ceil(filteredLoans.length / loansPerPage);
  const indexOfLastLoan = currentPage * loansPerPage;
  const indexOfFirstLoan = indexOfLastLoan - loansPerPage;
  const currentLoans = filteredLoans.slice(indexOfFirstLoan, indexOfLastLoan);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Loan Management</h1>
            <p className="text-gray-600">View and manage all loan applications</p>
          </div>
          <div className="flex space-x-3">
            <button className="btn btn-ghost">
              <Upload className="w-4 h-4 mr-2" />
              Import
            </button>
            <button className="btn btn-ghost">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <button className="btn btn-primary">
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="form-label">Search</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by ID, name..."
                  className="form-input pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>
            
            <div>
              <label className="form-label">Status</label>
              <select
                className="form-input"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="disbursed">Disbursed</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            
            <div>
              <label className="form-label">Sector</label>
              <select
                className="form-input"
                value={sectorFilter}
                onChange={(e) => setSectorFilter(e.target.value)}
              >
                {sectors.map((sector, index) => (
                  <option key={index} value={index === 0 ? 'all' : sector}>
                    {sector}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="form-label">Date Range</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  className="form-input"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                />
                <input
                  type="date"
                  className="form-input"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Loans Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Loan ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Applicant</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Sector</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Application Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Last Updated</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentLoans.map((loan) => (
                  <tr key={loan.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900">{loan.id}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">
                      <div className="flex flex-col">
                        <span>{loan.applicantName}</span>
                        <span className="text-xs text-gray-500">{loan.applicantId}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">₹{loan.amount.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{loan.sector}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(loan.status)}`}>
                        {getStatusIcon(loan.status)}
                        <span className="ml-1 capitalize">{loan.status}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">{new Date(loan.applicationDate).toLocaleDateString()}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{new Date(loan.lastUpdated).toLocaleDateString()}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleViewLoan(loan)}
                          className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-green-600 hover:text-green-800 hover:bg-green-50 rounded">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Showing {indexOfFirstLoan + 1} to {Math.min(indexOfLastLoan, filteredLoans.length)} of {filteredLoans.length} loans
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-md border border-gray-300 disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-md border border-gray-300 disabled:opacity-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Loan Details Modal */}
      {showLoanDetails && selectedLoan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Loan Details</h2>
              <button 
                onClick={() => setShowLoanDetails(false)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{selectedLoan.id}</h3>
                  <p className="text-sm text-gray-500">{selectedLoan.sector}</p>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedLoan.status)}`}>
                  {getStatusIcon(selectedLoan.status)}
                  <span className="ml-1 capitalize">{selectedLoan.status}</span>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Applicant Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <User className="w-4 h-4 text-gray-400 mr-2" />
                      <p className="text-gray-900">{selectedLoan.applicantName}</p>
                    </div>
                    <p className="text-sm text-gray-500">{selectedLoan.applicantId}</p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Loan Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 text-gray-400 mr-2" />
                      <p className="text-gray-900">₹{selectedLoan.amount.toLocaleString()}</p>
                    </div>
                    {selectedLoan.interestRate && (
                      <p className="text-sm text-gray-500">Interest Rate: {selectedLoan.interestRate}%</p>
                    )}
                    {selectedLoan.tenure && (
                      <p className="text-sm text-gray-500">Tenure: {selectedLoan.tenure} months</p>
                    )}
                    {selectedLoan.emi && (
                      <p className="text-sm text-gray-500">EMI: ₹{selectedLoan.emi.toLocaleString()}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Application Timeline</h4>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-4 w-4 rounded-full bg-blue-500 mt-1"></div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Application Submitted</p>
                        <p className="text-xs text-gray-500">{new Date(selectedLoan.applicationDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-4 w-4 rounded-full bg-yellow-500 mt-1"></div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Last Updated</p>
                        <p className="text-xs text-gray-500">{new Date(selectedLoan.lastUpdated).toLocaleDateString()}</p>
                      </div>
                    </div>
                    {selectedLoan.disbursementDate && (
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-4 w-4 rounded-full bg-green-500 mt-1"></div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">Disbursed</p>
                          <p className="text-xs text-gray-500">{new Date(selectedLoan.disbursementDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Documents</h4>
                  <div className="space-y-2">
                    <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">Application Form</span>
                      </div>
                      <Download className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">KYC Documents</span>
                      </div>
                      <Download className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">Income Proof</span>
                      </div>
                      <Download className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button 
                  onClick={() => setShowLoanDetails(false)}
                  className="btn btn-ghost"
                >
                  Close
                </button>
                {selectedLoan.status === 'pending' && (
                  <>
                    <button className="btn btn-ghost text-red-600 hover:bg-red-50">
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </button>
                    <button className="btn btn-primary">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </button>
                  </>
                )}
                {selectedLoan.status === 'approved' && (
                  <button className="btn btn-primary">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Disburse
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLoans;