import React, { useState, useEffect } from 'react';
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  X,
  Eye,
  Download,
  Clock,
  Search,
  Filter,
  ChevronDown,
  Paperclip,
  Calendar,
  User
} from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  status: 'pending' | 'verified' | 'rejected';
  category: string;
  notes?: string;
  url: string;
  thumbnailUrl?: string;
  userId?: string;
  userName?: string;
  applicationId?: string;
}

interface DocumentManagerProps {
  userType: 'user' | 'admin';
  userId?: string;
  applicationId?: string;
  onDocumentUpload?: (document: Document) => void;
  onDocumentDelete?: (documentId: string) => void;
  onDocumentVerify?: (documentId: string, status: 'verified' | 'rejected', notes?: string) => void;
  requiredDocuments?: Array<{
    type: string;
    name: string;
    description?: string;
    required: boolean;
  }>;
}

const DocumentManager: React.FC<DocumentManagerProps> = ({
  userType,
  userId,
  applicationId,
  onDocumentUpload,
  onDocumentDelete,
  onDocumentVerify,
  requiredDocuments = []
}) => {
  // State for documents
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  // State for document preview
  const [previewDocument, setPreviewDocument] = useState<Document | null>(null);
  
  // State for document verification
  const [verificationNotes, setVerificationNotes] = useState('');
  const [documentToVerify, setDocumentToVerify] = useState<Document | null>(null);
  
  // State for upload
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({});
  const [isUploading, setIsUploading] = useState(false);
  
  // Document categories
  const documentCategories = [
    'Identity Proof',
    'Address Proof',
    'Income Proof',
    'Property Documents',
    'Bank Statements',
    'Tax Documents',
    'Business Documents',
    'Other'
  ];
  
  // Mock data initialization
  useEffect(() => {
    // This would be an API call in a real application
    const mockDocuments: Document[] = [
      {
        id: '1',
        name: 'Aadhaar Card.pdf',
        type: 'application/pdf',
        size: 1024 * 1024 * 2.3, // 2.3 MB
        uploadDate: '2023-06-15T10:30:00Z',
        status: 'verified',
        category: 'Identity Proof',
        url: '#',
        thumbnailUrl: '#',
        userId: '101',
        userName: 'Rahul Sharma',
        applicationId: 'LOAN-2023-001'
      },
      {
        id: '2',
        name: 'PAN Card.jpg',
        type: 'image/jpeg',
        size: 1024 * 512, // 512 KB
        uploadDate: '2023-06-15T10:35:00Z',
        status: 'verified',
        category: 'Identity Proof',
        url: '#',
        thumbnailUrl: '#',
        userId: '101',
        userName: 'Rahul Sharma',
        applicationId: 'LOAN-2023-001'
      },
      {
        id: '3',
        name: 'Salary Slip - May 2023.pdf',
        type: 'application/pdf',
        size: 1024 * 1024 * 1.1, // 1.1 MB
        uploadDate: '2023-06-16T14:20:00Z',
        status: 'pending',
        category: 'Income Proof',
        url: '#',
        thumbnailUrl: '#',
        userId: '101',
        userName: 'Rahul Sharma',
        applicationId: 'LOAN-2023-001'
      },
      {
        id: '4',
        name: 'Bank Statement - Last 6 months.pdf',
        type: 'application/pdf',
        size: 1024 * 1024 * 3.7, // 3.7 MB
        uploadDate: '2023-06-16T14:25:00Z',
        status: 'pending',
        category: 'Bank Statements',
        url: '#',
        thumbnailUrl: '#',
        userId: '101',
        userName: 'Rahul Sharma',
        applicationId: 'LOAN-2023-001'
      },
      {
        id: '5',
        name: 'Property Deed.pdf',
        type: 'application/pdf',
        size: 1024 * 1024 * 5.2, // 5.2 MB
        uploadDate: '2023-06-17T09:15:00Z',
        status: 'rejected',
        notes: 'Document is not clearly visible. Please upload a better quality scan.',
        category: 'Property Documents',
        url: '#',
        thumbnailUrl: '#',
        userId: '101',
        userName: 'Rahul Sharma',
        applicationId: 'LOAN-2023-001'
      }
    ];
    
    setDocuments(mockDocuments);
    setFilteredDocuments(mockDocuments);
  }, []);
  
  // Apply filters and search
  useEffect(() => {
    let results = [...documents];
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(doc => 
        doc.name.toLowerCase().includes(term) ||
        doc.category.toLowerCase().includes(term)
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      results = results.filter(doc => doc.status === statusFilter);
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      results = results.filter(doc => doc.category === categoryFilter);
    }
    
    setFilteredDocuments(results);
  }, [documents, searchTerm, statusFilter, categoryFilter]);
  
  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, category: string) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    
    // Process each file
    Array.from(files).forEach(file => {
      const fileId = `upload-${Date.now()}-${file.name}`;
      
      // Set initial progress
      setUploadProgress(prev => ({
        ...prev,
        [fileId]: 0
      }));
      
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          const currentProgress = prev[fileId] || 0;
          const newProgress = Math.min(currentProgress + 10, 100);
          
          // If upload is complete, clear interval
          if (newProgress === 100) {
            clearInterval(interval);
            
            // After a short delay, add the document to the list
            setTimeout(() => {
              const newDocument: Document = {
                id: fileId,
                name: file.name,
                type: file.type,
                size: file.size,
                uploadDate: new Date().toISOString(),
                status: 'pending',
                category,
                url: '#', // In a real app, this would be the URL from the server
                userId,
                applicationId
              };
              
              setDocuments(prev => [...prev, newDocument]);
              
              // Remove from progress tracking
              setUploadProgress(prev => {
                const newProgress = { ...prev };
                delete newProgress[fileId];
                return newProgress;
              });
              
              // If all uploads are complete, reset uploading state
              if (Object.keys(newProgress).length === 0) {
                setIsUploading(false);
              }
              
              // Call the callback if provided
              if (onDocumentUpload) {
                onDocumentUpload(newDocument);
              }
            }, 500);
          }
          
          return {
            ...prev,
            [fileId]: newProgress
          };
        });
      }, 300);
    });
  };
  
  // Handle document deletion
  const handleDeleteDocument = (documentId: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== documentId));
    
    // Call the callback if provided
    if (onDocumentDelete) {
      onDocumentDelete(documentId);
    }
  };
  
  // Open document preview
  const handlePreviewDocument = (document: Document) => {
    setPreviewDocument(document);
  };
  
  // Open document verification modal
  const handleOpenVerification = (document: Document) => {
    setDocumentToVerify(document);
    setVerificationNotes(document.notes || '');
  };
  
  // Handle document verification
  const handleVerifyDocument = (status: 'verified' | 'rejected') => {
    if (!documentToVerify) return;
    
    // Update document status
    setDocuments(prev => prev.map(doc => 
      doc.id === documentToVerify.id 
        ? { ...doc, status, notes: status === 'rejected' ? verificationNotes : undefined }
        : doc
    ));
    
    // Call the callback if provided
    if (onDocumentVerify) {
      onDocumentVerify(documentToVerify.id, status, status === 'rejected' ? verificationNotes : undefined);
    }
    
    // Close the verification modal
    setDocumentToVerify(null);
    setVerificationNotes('');
  };
  
  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };
  
  // Format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };
  
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 flex items-center"><CheckCircle className="w-3 h-3 mr-1" /> Verified</span>;
      case 'rejected':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 flex items-center"><X className="w-3 h-3 mr-1" /> Rejected</span>;
      case 'pending':
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 flex items-center"><Clock className="w-3 h-3 mr-1" /> Pending</span>;
      default:
        return null;
    }
  };
  
  // Get document icon based on file type
  const getDocumentIcon = (type: string) => {
    if (type.startsWith('image/')) {
      return <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"><FileText className="w-6 h-6 text-blue-600" /></div>;
    }
    if (type === 'application/pdf') {
      return <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center"><FileText className="w-6 h-6 text-red-600" /></div>;
    }
    return <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center"><FileText className="w-6 h-6 text-gray-600" /></div>;
  };
  
  // Check if a required document is uploaded
  const isDocumentUploaded = (type: string): boolean => {
    return documents.some(doc => doc.category === type && (doc.status === 'verified' || doc.status === 'pending'));
  };
  
  // Render document upload section for user
  const renderUserUploadSection = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Required Documents</h2>
          <p className="text-sm text-gray-500 mt-1">
            Please upload all required documents for verification. Accepted formats: PDF, JPG, PNG (max 10MB)
          </p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {requiredDocuments.map((doc, index) => (
              <div 
                key={index} 
                className={`border rounded-lg p-4 ${isDocumentUploaded(doc.type) ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {doc.name}
                      {doc.required && <span className="text-red-500 ml-1">*</span>}
                    </h3>
                    {doc.description && (
                      <p className="text-xs text-gray-500 mt-1">{doc.description}</p>
                    )}
                  </div>
                  {isDocumentUploaded(doc.type) && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </div>
                
                {isDocumentUploaded(doc.type) ? (
                  <div>
                    {documents
                      .filter(document => document.category === doc.type)
                      .map(document => (
                        <div key={document.id} className="flex items-center justify-between text-sm bg-white p-2 rounded border border-gray-200 mb-2">
                          <div className="flex items-center">
                            <FileText className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="truncate max-w-xs">{document.name}</span>
                          </div>
                          <div className="flex items-center">
                            {getStatusBadge(document.status)}
                            <button 
                              onClick={() => handlePreviewDocument(document)}
                              className="ml-2 text-gray-500 hover:text-gray-700"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    }
                    
                    <label className="mt-2 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none cursor-pointer">
                      <Upload className="-ml-1 mr-1 h-4 w-4 text-gray-500" />
                      Upload Another
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload(e, doc.type)}
                      />
                    </label>
                  </div>
                ) : (
                  <label className="block w-full cursor-pointer">
                    <div className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-gray-300 rounded-md hover:border-gray-400 bg-gray-50">
                      <Upload className="h-6 w-6 text-gray-400 mb-1" />
                      <p className="text-xs text-gray-500">Click to upload {doc.name}</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(e, doc.type)}
                    />
                  </label>
                )}
              </div>
            ))}
          </div>
          
          {/* Upload progress indicators */}
          {Object.keys(uploadProgress).length > 0 && (
            <div className="mt-6 space-y-3">
              <h3 className="text-sm font-medium text-gray-900">Uploading Documents</h3>
              {Object.entries(uploadProgress).map(([fileId, progress]) => (
                <div key={fileId} className="bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${progress}%` }}
                  ></div>
                  <p className="text-xs text-gray-500 mt-1">{fileId.split('-').slice(2).join('-')} - {progress}%</p>
                </div>
              ))}
            </div>
          )}
          
          {/* Other documents upload */}
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Additional Documents</h3>
            <div className="border border-gray-200 rounded-lg p-4">
              <label className="block w-full cursor-pointer">
                <div className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-gray-300 rounded-md hover:border-gray-400 bg-gray-50">
                  <Upload className="h-6 w-6 text-gray-400 mb-1" />
                  <p className="text-sm text-gray-500">Click to upload additional documents</p>
                  <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG (max 10MB)</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  multiple
                  onChange={(e) => handleFileUpload(e, 'Other')}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Render admin document management section
  const renderAdminDocumentSection = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Document Management</h2>
            <p className="text-sm text-gray-500 mt-1">
              Review and verify user submitted documents
            </p>
          </div>
          <div className="flex space-x-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="form-input pl-9 py-2 text-sm"
                placeholder="Search documents"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select
              className="form-select py-2 text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
              <option value="rejected">Rejected</option>
            </select>
            
            <select
              className="form-select py-2 text-sm"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              {documentCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Document
                </th>
                {userType === 'admin' && (
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                )}
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Uploaded
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDocuments.length > 0 ? (
                filteredDocuments.map((document) => (
                  <tr key={document.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getDocumentIcon(document.type)}
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 truncate max-w-xs">{document.name}</div>
                          <div className="text-xs text-gray-500">{document.type.split('/')[1].toUpperCase()}</div>
                        </div>
                      </div>
                    </td>
                    {userType === 'admin' && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-gray-500" />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{document.userName || 'Unknown User'}</div>
                            <div className="text-xs text-gray-500">ID: {document.userId}</div>
                          </div>
                        </div>
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                        {document.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-gray-400 mr-1" />
                        {formatDate(document.uploadDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatFileSize(document.size)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(document.status)}
                      {document.notes && (
                        <div className="text-xs text-gray-500 mt-1 max-w-xs truncate" title={document.notes}>
                          Note: {document.notes}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handlePreviewDocument(document)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Preview"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => window.open(document.url, '_blank')}
                          className="text-green-600 hover:text-green-900"
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        {userType === 'admin' && document.status === 'pending' && (
                          <button
                            onClick={() => handleOpenVerification(document)}
                            className="text-yellow-600 hover:text-yellow-900"
                            title="Verify"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        {(userType === 'user' || (userType === 'admin' && document.status === 'pending')) && (
                          <button
                            onClick={() => handleDeleteDocument(document.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={userType === 'admin' ? 7 : 6} className="px-6 py-4 text-center text-sm text-gray-500">
                    No documents found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  return (
    <div>
      {/* User upload section */}
      {userType === 'user' && renderUserUploadSection()}
      
      {/* Document list section */}
      {renderAdminDocumentSection()}
      
      {/* Document Preview Modal */}
      {previewDocument && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
              <h3 className="text-lg font-medium text-gray-900 truncate max-w-lg">
                {previewDocument.name}
              </h3>
              <button
                onClick={() => setPreviewDocument(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="bg-gray-100 rounded-lg p-4 mb-4 flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">Category: <span className="font-medium text-gray-900">{previewDocument.category}</span></div>
                  <div className="text-sm text-gray-500">Uploaded: <span className="font-medium text-gray-900">{formatDate(previewDocument.uploadDate)}</span></div>
                  <div className="text-sm text-gray-500">Size: <span className="font-medium text-gray-900">{formatFileSize(previewDocument.size)}</span></div>
                </div>
                <div>
                  {getStatusBadge(previewDocument.status)}
                </div>
              </div>
              
              {/* Document preview */}
              <div className="bg-gray-800 rounded-lg overflow-hidden h-96 flex items-center justify-center">
                {previewDocument.type.startsWith('image/') ? (
                  <img 
                    src={previewDocument.url} 
                    alt={previewDocument.name} 
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <div className="text-center p-8">
                    <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-300 mb-4">Preview not available for this file type</p>
                    <button
                      onClick={() => window.open(previewDocument.url, '_blank')}
                      className="btn btn-primary"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download to View
                    </button>
                  </div>
                )}
              </div>
              
              {/* Notes section */}
              {previewDocument.notes && (
                <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-yellow-800 mb-1">Notes:</h4>
                  <p className="text-sm text-yellow-700">{previewDocument.notes}</p>
                </div>
              )}
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
              <button
                type="button"
                onClick={() => setPreviewDocument(null)}
                className="btn btn-ghost"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => window.open(previewDocument.url, '_blank')}
                className="btn btn-primary ml-3"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Document Verification Modal */}
      {documentToVerify && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
            <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
              <h3 className="text-lg font-medium text-gray-900">
                Verify Document
              </h3>
              <button
                onClick={() => setDocumentToVerify(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex items-center mb-4">
                {getDocumentIcon(documentToVerify.type)}
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">{documentToVerify.name}</div>
                  <div className="text-xs text-gray-500">{documentToVerify.category}</div>
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="verificationNotes" className="block text-sm font-medium text-gray-700 mb-1">
                  Verification Notes (required for rejection)
                </label>
                <textarea
                  id="verificationNotes"
                  rows={3}
                  className="form-textarea w-full"
                  placeholder="Enter notes about this document verification"
                  value={verificationNotes}
                  onChange={(e) => setVerificationNotes(e.target.value)}
                />
              </div>
              
              <div className="flex items-center justify-center space-x-4">
                <button
                  type="button"
                  onClick={() => handleVerifyDocument('verified')}
                  className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve
                  </div>
                </button>
                
                <button
                  type="button"
                  onClick={() => handleVerifyDocument('rejected')}
                  className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  disabled={!verificationNotes.trim()}
                >
                  <div className="flex items-center justify-center">
                    <X className="w-4 h-4 mr-2" />
                    Reject
                  </div>
                </button>
              </div>
              
              {!verificationNotes.trim() && (
                <p className="text-xs text-red-500 mt-2 text-center">
                  Notes are required when rejecting a document
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentManager;