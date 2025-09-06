import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle,
  X,
  Percent,
  Calendar,
  DollarSign,
  Clock,
  Users,
  Building,
  Briefcase,
  FileText
} from 'lucide-react';

interface LoanScheme {
  id: string;
  name: string;
  sector: string;
  description: string;
  interestRate: number;
  minAmount: number;
  maxAmount: number;
  minTenure: number;
  maxTenure: number;
  eligibility: string[];
  documents: string[];
  status: 'active' | 'inactive' | 'draft';
  createdAt: string;
  updatedAt: string;
}

interface SectorStats {
  sector: string;
  totalSchemes: number;
  activeSchemes: number;
  avgInterestRate: number;
  totalApplications: number;
  approvalRate: number;
}

const LoanSchemes: React.FC = () => {
  // State for loan schemes
  const [schemes, setSchemes] = useState<LoanScheme[]>([]);
  const [filteredSchemes, setFilteredSchemes] = useState<LoanScheme[]>([]);
  const [sectorStats, setSectorStats] = useState<SectorStats[]>([]);
  
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sectorFilter, setSectorFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<string>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  // State for modals
  const [showSchemeModal, setShowSchemeModal] = useState(false);
  const [currentScheme, setCurrentScheme] = useState<LoanScheme | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    sector: '',
    description: '',
    interestRate: 0,
    minAmount: 0,
    maxAmount: 0,
    minTenure: 0,
    maxTenure: 0,
    eligibility: [''],
    documents: [''],
    status: 'draft'
  });
  
  // Sectors list
  const sectors = [
    'Agriculture',
    'Education',
    'Housing',
    'Business',
    'Personal',
    'Vehicle',
    'Healthcare',
    'Green Energy',
    'Infrastructure',
    'Technology'
  ];
  
  // Mock data initialization
  useEffect(() => {
    // This would be an API call in a real application
    const mockSchemes: LoanScheme[] = [
      {
        id: '1',
        name: 'Agriculture Development Loan',
        sector: 'Agriculture',
        description: 'Low interest loans for farmers to purchase equipment and seeds',
        interestRate: 4.5,
        minAmount: 50000,
        maxAmount: 1000000,
        minTenure: 12,
        maxTenure: 60,
        eligibility: ['Land ownership documents', 'Income proof', 'Farming history'],
        documents: ['Land records', 'Income tax returns', 'Crop history'],
        status: 'active',
        createdAt: '2023-05-15T10:30:00Z',
        updatedAt: '2023-06-20T14:45:00Z'
      },
      {
        id: '2',
        name: 'Higher Education Loan',
        sector: 'Education',
        description: 'Support for students pursuing higher education in India or abroad',
        interestRate: 7.5,
        minAmount: 100000,
        maxAmount: 5000000,
        minTenure: 36,
        maxTenure: 180,
        eligibility: ['Admission letter', 'Academic records', 'Co-applicant required'],
        documents: ['Admission proof', 'Academic certificates', 'Co-applicant documents'],
        status: 'active',
        createdAt: '2023-04-10T09:15:00Z',
        updatedAt: '2023-06-18T11:20:00Z'
      },
      {
        id: '3',
        name: 'Home Construction Loan',
        sector: 'Housing',
        description: 'Financing for construction of new residential properties',
        interestRate: 8.25,
        minAmount: 500000,
        maxAmount: 10000000,
        minTenure: 60,
        maxTenure: 240,
        eligibility: ['Land ownership', 'Building plan approval', 'Income criteria'],
        documents: ['Property papers', 'Approved building plan', 'Income proof'],
        status: 'active',
        createdAt: '2023-03-22T13:40:00Z',
        updatedAt: '2023-06-15T16:30:00Z'
      },
      {
        id: '4',
        name: 'MSME Business Expansion',
        sector: 'Business',
        description: 'Funding for small businesses looking to expand operations',
        interestRate: 9.0,
        minAmount: 200000,
        maxAmount: 5000000,
        minTenure: 12,
        maxTenure: 84,
        eligibility: ['2+ years in business', 'Profitable operations', 'Business plan'],
        documents: ['Business registration', 'Financial statements', 'Business plan'],
        status: 'active',
        createdAt: '2023-02-18T11:25:00Z',
        updatedAt: '2023-06-10T09:50:00Z'
      },
      {
        id: '5',
        name: 'Personal Loan',
        sector: 'Personal',
        description: 'Multi-purpose personal financing with minimal documentation',
        interestRate: 12.5,
        minAmount: 50000,
        maxAmount: 1500000,
        minTenure: 12,
        maxTenure: 60,
        eligibility: ['Minimum income', 'Credit score > 700', 'Employment stability'],
        documents: ['ID proof', 'Income proof', 'Address proof'],
        status: 'active',
        createdAt: '2023-01-05T10:15:00Z',
        updatedAt: '2023-06-05T14:20:00Z'
      },
      {
        id: '6',
        name: 'Electric Vehicle Loan',
        sector: 'Vehicle',
        description: 'Special financing for electric vehicles with lower interest rates',
        interestRate: 6.75,
        minAmount: 300000,
        maxAmount: 3000000,
        minTenure: 12,
        maxTenure: 84,
        eligibility: ['Income criteria', 'Vehicle quotation'],
        documents: ['ID proof', 'Income proof', 'Vehicle quotation'],
        status: 'draft',
        createdAt: '2023-06-01T15:30:00Z',
        updatedAt: '2023-06-01T15:30:00Z'
      },
      {
        id: '7',
        name: 'Medical Equipment Financing',
        sector: 'Healthcare',
        description: 'Loans for healthcare professionals to purchase medical equipment',
        interestRate: 8.0,
        minAmount: 200000,
        maxAmount: 7500000,
        minTenure: 24,
        maxTenure: 84,
        eligibility: ['Medical practice proof', 'Professional registration', 'Business plan'],
        documents: ['Medical license', 'Clinic registration', 'Equipment quotation'],
        status: 'inactive',
        createdAt: '2022-11-12T09:45:00Z',
        updatedAt: '2023-05-20T11:10:00Z'
      }
    ];
    
    setSchemes(mockSchemes);
    setFilteredSchemes(mockSchemes);
    
    // Generate sector statistics
    const stats: SectorStats[] = sectors.map(sector => {
      const sectorSchemes = mockSchemes.filter(scheme => scheme.sector === sector);
      const activeSchemes = sectorSchemes.filter(scheme => scheme.status === 'active');
      
      return {
        sector,
        totalSchemes: sectorSchemes.length,
        activeSchemes: activeSchemes.length,
        avgInterestRate: activeSchemes.length > 0 
          ? parseFloat((activeSchemes.reduce((sum, scheme) => sum + scheme.interestRate, 0) / activeSchemes.length).toFixed(2))
          : 0,
        totalApplications: Math.floor(Math.random() * 100),
        approvalRate: parseFloat((Math.random() * 30 + 70).toFixed(2)) // Random between 70-100%
      };
    }).filter(stat => stat.totalSchemes > 0); // Only include sectors with schemes
    
    setSectorStats(stats);
  }, []);
  
  // Apply filters and search
  useEffect(() => {
    let results = [...schemes];
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(scheme => 
        scheme.name.toLowerCase().includes(term) ||
        scheme.description.toLowerCase().includes(term) ||
        scheme.sector.toLowerCase().includes(term)
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      results = results.filter(scheme => scheme.status === statusFilter);
    }
    
    // Apply sector filter
    if (sectorFilter !== 'all') {
      results = results.filter(scheme => scheme.sector === sectorFilter);
    }
    
    // Apply sorting
    results.sort((a, b) => {
      let aValue: any = a[sortField as keyof LoanScheme];
      let bValue: any = b[sortField as keyof LoanScheme];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    
    setFilteredSchemes(results);
  }, [schemes, searchTerm, statusFilter, sectorFilter, sortField, sortDirection]);
  
  // Handle sort change
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Get sort icon
  const getSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle array input change (eligibility and documents)
  const handleArrayInputChange = (index: number, value: string, field: 'eligibility' | 'documents') => {
    setFormData(prev => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return {
        ...prev,
        [field]: newArray
      };
    });
  };
  
  // Add new array item
  const addArrayItem = (field: 'eligibility' | 'documents') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };
  
  // Remove array item
  const removeArrayItem = (index: number, field: 'eligibility' | 'documents') => {
    setFormData(prev => {
      const newArray = [...prev[field]];
      newArray.splice(index, 1);
      return {
        ...prev,
        [field]: newArray
      };
    });
  };
  
  // Open scheme modal for creation
  const openCreateModal = () => {
    setFormData({
      name: '',
      sector: '',
      description: '',
      interestRate: 0,
      minAmount: 0,
      maxAmount: 0,
      minTenure: 0,
      maxTenure: 0,
      eligibility: [''],
      documents: [''],
      status: 'draft'
    });
    setIsEditMode(false);
    setCurrentScheme(null);
    setShowSchemeModal(true);
  };
  
  // Open scheme modal for editing
  const openEditModal = (scheme: LoanScheme) => {
    setFormData({
      name: scheme.name,
      sector: scheme.sector,
      description: scheme.description,
      interestRate: scheme.interestRate,
      minAmount: scheme.minAmount,
      maxAmount: scheme.maxAmount,
      minTenure: scheme.minTenure,
      maxTenure: scheme.maxTenure,
      eligibility: [...scheme.eligibility],
      documents: [...scheme.documents],
      status: scheme.status
    });
    setIsEditMode(true);
    setCurrentScheme(scheme);
    setShowSchemeModal(true);
  };
  
  // Open delete confirmation
  const openDeleteConfirm = (scheme: LoanScheme) => {
    setCurrentScheme(scheme);
    setShowDeleteConfirm(true);
  };
  
  // Handle scheme save
  const handleSaveScheme = () => {
    // Validate form
    if (!formData.name || !formData.sector || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (isEditMode && currentScheme) {
      // Update existing scheme
      const updatedSchemes = schemes.map(scheme => 
        scheme.id === currentScheme.id 
          ? {
              ...scheme,
              ...formData,
              updatedAt: new Date().toISOString()
            }
          : scheme
      );
      setSchemes(updatedSchemes);
    } else {
      // Create new scheme
      const newScheme: LoanScheme = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setSchemes([...schemes, newScheme]);
    }
    
    setShowSchemeModal(false);
  };
  
  // Handle scheme delete
  const handleDeleteScheme = () => {
    if (!currentScheme) return;
    
    const updatedSchemes = schemes.filter(scheme => scheme.id !== currentScheme.id);
    setSchemes(updatedSchemes);
    setShowDeleteConfirm(false);
  };
  
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Active</span>;
      case 'inactive':
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">Inactive</span>;
      case 'draft':
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Draft</span>;
      default:
        return null;
    }
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Loan Schemes</h1>
        <button
          onClick={openCreateModal}
          className="btn btn-primary flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Scheme
        </button>
      </div>
      
      {/* Sector Statistics */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Sector Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sectorStats.map((stat) => (
            <div key={stat.sector} className="bg-white rounded-lg shadow p-4 border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{stat.sector}</h3>
                  <div className="mt-1 flex items-center">
                    <span className="text-sm text-gray-500 mr-2">Schemes:</span>
                    <span className="text-sm font-medium">{stat.activeSchemes}/{stat.totalSchemes}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <Percent className="w-4 h-4 text-blue-500 mr-1" />
                  <span className="font-medium">{stat.avgInterestRate}%</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-gray-400 mr-1" />
                    <span>{stat.totalApplications} applications</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                    <span>{stat.approvalRate}% approval</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="form-input pl-10 w-full"
                placeholder="Search schemes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex items-center">
                <label htmlFor="statusFilter" className="mr-2 text-sm text-gray-600">Status:</label>
                <select
                  id="statusFilter"
                  className="form-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <label htmlFor="sectorFilter" className="mr-2 text-sm text-gray-600">Sector:</label>
                <select
                  id="sectorFilter"
                  className="form-select"
                  value={sectorFilter}
                  onChange={(e) => setSectorFilter(e.target.value)}
                >
                  <option value="all">All Sectors</option>
                  {sectors.map(sector => (
                    <option key={sector} value={sector}>{sector}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Schemes Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    <span>Scheme Name</span>
                    {getSortIcon('name')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('sector')}
                >
                  <div className="flex items-center">
                    <span>Sector</span>
                    {getSortIcon('sector')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('interestRate')}
                >
                  <div className="flex items-center">
                    <span>Interest Rate</span>
                    {getSortIcon('interestRate')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('maxAmount')}
                >
                  <div className="flex items-center">
                    <span>Loan Amount</span>
                    {getSortIcon('maxAmount')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center">
                    <span>Status</span>
                    {getSortIcon('status')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('updatedAt')}
                >
                  <div className="flex items-center">
                    <span>Last Updated</span>
                    {getSortIcon('updatedAt')}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSchemes.length > 0 ? (
                filteredSchemes.map((scheme) => (
                  <tr key={scheme.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{scheme.name}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{scheme.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{scheme.sector}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{scheme.interestRate}%</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatCurrency(scheme.minAmount)} - {formatCurrency(scheme.maxAmount)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {scheme.minTenure} - {scheme.maxTenure} months
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(scheme.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(scheme.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => openEditModal(scheme)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openDeleteConfirm(scheme)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                    No loan schemes found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Scheme Modal */}
      {showSchemeModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
              <h3 className="text-lg font-medium text-gray-900">
                {isEditMode ? 'Edit Loan Scheme' : 'Create New Loan Scheme'}
              </h3>
              <button
                onClick={() => setShowSchemeModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="px-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Scheme Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input w-full"
                    placeholder="Enter scheme name"
                  />
                </div>
                
                <div>
                  <label htmlFor="sector" className="block text-sm font-medium text-gray-700 mb-1">Sector</label>
                  <select
                    id="sector"
                    name="sector"
                    value={formData.sector}
                    onChange={handleInputChange}
                    className="form-select w-full"
                  >
                    <option value="">Select sector</option>
                    {sectors.map(sector => (
                      <option key={sector} value={sector}>{sector}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="form-select w-full"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="form-textarea w-full"
                    placeholder="Enter scheme description"
                  />
                </div>
                
                <div>
                  <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <Percent className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      id="interestRate"
                      name="interestRate"
                      value={formData.interestRate}
                      onChange={handleInputChange}
                      className="form-input w-full pr-10"
                      step="0.01"
                      min="0"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="minAmount" className="block text-sm font-medium text-gray-700 mb-1">Min Amount</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">₹</span>
                      </div>
                      <input
                        type="number"
                        id="minAmount"
                        name="minAmount"
                        value={formData.minAmount}
                        onChange={handleInputChange}
                        className="form-input w-full pl-8"
                        min="0"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="maxAmount" className="block text-sm font-medium text-gray-700 mb-1">Max Amount</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">₹</span>
                      </div>
                      <input
                        type="number"
                        id="maxAmount"
                        name="maxAmount"
                        value={formData.maxAmount}
                        onChange={handleInputChange}
                        className="form-input w-full pl-8"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="minTenure" className="block text-sm font-medium text-gray-700 mb-1">Min Tenure (months)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <Clock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        id="minTenure"
                        name="minTenure"
                        value={formData.minTenure}
                        onChange={handleInputChange}
                        className="form-input w-full pr-10"
                        min="0"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="maxTenure" className="block text-sm font-medium text-gray-700 mb-1">Max Tenure (months)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <Clock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        id="maxTenure"
                        name="maxTenure"
                        value={formData.maxTenure}
                        onChange={handleInputChange}
                        className="form-input w-full pr-10"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Eligibility Criteria</label>
                  {formData.eligibility.map((item, index) => (
                    <div key={`eligibility-${index}`} className="flex items-center mb-2">
                      <div className="flex-grow">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => handleArrayInputChange(index, e.target.value, 'eligibility')}
                          className="form-input w-full"
                          placeholder="Enter eligibility criterion"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeArrayItem(index, 'eligibility')}
                        className="ml-2 text-red-600 hover:text-red-800"
                        disabled={formData.eligibility.length <= 1}
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('eligibility')}
                    className="mt-1 text-sm text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Eligibility Criterion
                  </button>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Required Documents</label>
                  {formData.documents.map((item, index) => (
                    <div key={`document-${index}`} className="flex items-center mb-2">
                      <div className="flex-grow">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => handleArrayInputChange(index, e.target.value, 'documents')}
                          className="form-input w-full"
                          placeholder="Enter required document"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeArrayItem(index, 'documents')}
                        className="ml-2 text-red-600 hover:text-red-800"
                        disabled={formData.documents.length <= 1}
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('documents')}
                    className="mt-1 text-sm text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Required Document
                  </button>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
              <button
                type="button"
                onClick={() => setShowSchemeModal(false)}
                className="btn btn-ghost mr-3"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveScheme}
                className="btn btn-primary"
              >
                {isEditMode ? 'Update Scheme' : 'Create Scheme'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && currentScheme && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-center text-gray-900 mb-2">
                Delete Loan Scheme
              </h3>
              <p className="text-sm text-gray-500 text-center mb-6">
                Are you sure you want to delete the scheme "{currentScheme.name}"? This action cannot be undone.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteScheme}
                  className="btn bg-red-600 hover:bg-red-700 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanSchemes;