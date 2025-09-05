import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Building,
  CreditCard,
  FileText,
  Edit,
  Save,
  X,
  CheckCircle2,
  AlertCircle,
  Clock,
  Upload,
  Eye,
  Download,
  Shield,
  Briefcase,
  Home,
  Car,
  GraduationCap,
} from 'lucide-react';

const Profile: React.FC = () => {
  const { user } = useAuth();

  if (user?.role === 'admin') {
    return <AdminProfile />;
  }

  return <UserProfile />;
};

const UserProfile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [editData, setEditData] = useState({
    fullName: user?.fullName || '',
    phone: user?.phone || '',
    dateOfBirth: user?.dateOfBirth || '',
    occupation: user?.employmentDetails?.companyName || '',
    monthlyIncome: user?.employmentDetails?.monthlyIncome || 0,
  });

  const handleSave = async () => {
    try {
      await updateProfile(editData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const kycStatus = user?.kycStatus || 'pending';
  const profileCompletion = user?.profileComplete ? 100 : 60;

  const documents = [
    { name: 'Aadhaar Card', status: 'verified', uploadedAt: '2025-01-15', type: 'identity' },
    { name: 'PAN Card', status: 'verified', uploadedAt: '2025-01-15', type: 'identity' },
    { name: 'Bank Statement', status: 'pending', uploadedAt: '2025-01-16', type: 'income' },
    { name: 'Salary Slip', status: 'pending', uploadedAt: '2025-01-16', type: 'income' },
  ];

  const loanApplications = [
    { id: '1', type: 'Personal Loan', amount: '₹5,00,000', status: 'under_review', appliedDate: '2025-01-15', icon: User },
    { id: '2', type: 'Home Loan', amount: '₹25,00,000', status: 'draft', appliedDate: '2025-01-10', icon: Home },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': case 'approved': return 'text-green-600 bg-green-100';
      case 'pending': case 'under_review': return 'text-yellow-600 bg-yellow-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'draft': return 'text-slate-600 bg-slate-100';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  const tabs = [
    { id: 'personal', name: 'Personal Info', icon: User },
    { id: 'documents', name: 'Documents', icon: FileText },
    { id: 'loans', name: 'Loan Applications', icon: CreditCard },
    { id: 'security', name: 'Security', icon: Shield },
  ];

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {user?.fullName?.charAt(0) || 'U'}
                  </span>
                </div>
                <button className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-1.5 hover:bg-blue-700 transition">
                  <Upload className="w-3 h-3" />
                </button>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{user?.fullName}</h1>
                <p className="text-slate-600">{user?.email}</p>
                <div className="flex items-center mt-2 space-x-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(kycStatus)}`}>
                    {kycStatus === 'verified' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                    {kycStatus === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                    {kycStatus === 'rejected' && <AlertCircle className="w-3 h-3 mr-1" />}
                    KYC {kycStatus}
                  </span>
                  <span className="text-sm text-slate-500">
                    Profile {profileCompletion}% complete
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn btn-ghost"
            >
              {isEditing ? <X className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {/* Profile Completion Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">Profile Completion</span>
              <span className="text-sm text-slate-500">{profileCompletion}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${profileCompletion}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="border-b border-slate-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'personal' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.fullName}
                      onChange={(e) => setEditData(prev => ({ ...prev, fullName: e.target.value }))}
                      className="form-input"
                    />
                  ) : (
                    <p className="text-slate-900 font-medium">{user?.fullName}</p>
                  )}
                </div>
                <div>
                  <label className="form-label">Email Address</label>
                  <p className="text-slate-900 font-medium">{user?.email}</p>
                  <p className="text-xs text-slate-500 mt-1">Email cannot be changed</p>
                </div>
                <div>
                  <label className="form-label">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editData.phone}
                      onChange={(e) => setEditData(prev => ({ ...prev, phone: e.target.value }))}
                      className="form-input"
                    />
                  ) : (
                    <p className="text-slate-900 font-medium">{user?.phone}</p>
                  )}
                </div>
                <div>
                  <label className="form-label">Date of Birth</label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={editData.dateOfBirth}
                      onChange={(e) => setEditData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                      className="form-input"
                    />
                  ) : (
                    <p className="text-slate-900 font-medium">{user?.dateOfBirth || 'Not provided'}</p>
                  )}
                </div>
                <div>
                  <label className="form-label">Aadhaar Number</label>
                  <p className="text-slate-900 font-medium">
                    {user?.aadhaarNumber ? `XXXX-XXXX-${user.aadhaarNumber.slice(-4)}` : 'Not provided'}
                  </p>
                </div>
                <div>
                  <label className="form-label">PAN Number</label>
                  <p className="text-slate-900 font-medium">{user?.panNumber || 'Not provided'}</p>
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="btn btn-ghost"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="btn btn-primary"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Document Verification</h3>
                <button className="btn btn-primary">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Document
                </button>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-slate-100 rounded-lg">
                        <FileText className="w-5 h-5 text-slate-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{doc.name}</p>
                        <p className="text-sm text-slate-500">Uploaded on {doc.uploadedAt}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                        {doc.status === 'verified' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                        {doc.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                        {doc.status}
                      </span>
                      <button className="text-slate-400 hover:text-slate-600">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-slate-400 hover:text-slate-600">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'loans' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Loan Applications</h3>
                <button className="btn btn-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  New Application
                </button>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {loanApplications.map((loan) => (
                  <div key={loan.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <loan.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{loan.type}</p>
                        <p className="text-sm text-slate-500">{loan.amount} • Applied on {loan.appliedDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(loan.status)}`}>
                        {loan.status === 'approved' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                        {loan.status === 'under_review' && <Clock className="w-3 h-3 mr-1" />}
                        {loan.status === 'draft' && <Edit className="w-3 h-3 mr-1" />}
                        {loan.status.replace('_', ' ')}
                      </span>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {loanApplications.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">No loan applications yet</h3>
                  <p className="text-slate-600 mb-4">Start your financial journey by applying for a loan</p>
                  <button className="btn btn-primary">
                    Apply for Loan
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-900">Security Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900">Password</p>
                    <p className="text-sm text-slate-500">Last changed 30 days ago</p>
                  </div>
                  <button className="btn btn-ghost">Change Password</button>
                </div>

                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900">Two-Factor Authentication</p>
                    <p className="text-sm text-slate-500">Add an extra layer of security</p>
                  </div>
                  <button className="btn btn-ghost">Enable 2FA</button>
                </div>

                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900">Login Sessions</p>
                    <p className="text-sm text-slate-500">Manage your active sessions</p>
                  </div>
                  <button className="btn btn-ghost">View Sessions</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="border-b border-slate-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Tab content is rendered above */}
        </div>
      </div>
    </div>
  );
};

const AdminProfile: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('organization');

  const tabs = [
    { id: 'organization', name: 'Organization', icon: Building },
    { id: 'permissions', name: 'Permissions', icon: Shield },
    { id: 'activity', name: 'Activity Log', icon: Clock },
    { id: 'security', name: 'Security', icon: Shield },
  ];

  const permissions = [
    { name: 'User Management', granted: true, description: 'Create, edit, and manage user accounts' },
    { name: 'Loan Scheme Management', granted: true, description: 'Create and modify loan schemes' },
    { name: 'Analytics Access', granted: true, description: 'View platform analytics and reports' },
    { name: 'Compliance Management', granted: true, description: 'Manage compliance settings and reports' },
    { name: 'System Administration', granted: false, description: 'Full system administration access' },
  ];

  const activityLog = [
    { action: 'Created new loan scheme', timestamp: '2025-01-16 10:30 AM', details: 'Personal Loan - Standard' },
    { action: 'Updated user permissions', timestamp: '2025-01-16 09:15 AM', details: 'Modified access for team member' },
    { action: 'Generated compliance report', timestamp: '2025-01-15 04:45 PM', details: 'Monthly RBI compliance report' },
    { action: 'Approved loan application', timestamp: '2025-01-15 02:20 PM', details: 'Application ID: LOAN-2025-001' },
  ];

  return (
    <div className="space-y-6">
      {/* Admin Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {user?.fullName?.charAt(0) || 'A'}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{user?.fullName}</h1>
                <p className="text-slate-600">{user?.organizationDetails?.designation}</p>
                <p className="text-sm text-slate-500">{user?.organizationDetails?.name}</p>
                <div className="flex items-center mt-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user?.organizationDetails?.verificationStatus === 'verified' 
                      ? 'text-green-600 bg-green-100' 
                      : 'text-yellow-600 bg-yellow-100'
                  }`}>
                    {user?.organizationDetails?.verificationStatus === 'verified' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                    {user?.organizationDetails?.verificationStatus === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                    Organization {user?.organizationDetails?.verificationStatus || 'Pending'}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500">Admin ID</p>
              <p className="font-mono text-sm text-slate-900">{user?.id}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="border-b border-slate-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'organization' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">Organization Name</label>
                  <p className="text-slate-900 font-medium">{user?.organizationDetails?.name}</p>
                </div>
                <div>
                  <label className="form-label">Organization Type</label>
                  <p className="text-slate-900 font-medium capitalize">{user?.organizationDetails?.type}</p>
                </div>
                <div>
                  <label className="form-label">Registration Number</label>
                  <p className="text-slate-900 font-medium">{user?.organizationDetails?.registrationNumber}</p>
                </div>
                <div>
                  <label className="form-label">RBI License Number</label>
                  <p className="text-slate-900 font-medium">{user?.organizationDetails?.rbiLicenseNumber || 'N/A'}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="form-label">Organization Address</label>
                  <p className="text-slate-900 font-medium">
                    {user?.organizationDetails?.address?.addressLine1}, {user?.organizationDetails?.address?.city}, {user?.organizationDetails?.address?.state} - {user?.organizationDetails?.address?.pincode}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'permissions' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-900">Access Permissions</h3>
              
              <div className="space-y-4">
                {permissions.map((permission, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900">{permission.name}</p>
                      <p className="text-sm text-slate-500">{permission.description}</p>
                    </div>
                    <div className="flex items-center">
                      {permission.granted ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-green-600 bg-green-100">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Granted
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-slate-600 bg-slate-100">
                          <X className="w-3 h-3 mr-1" />
                          Not Granted
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-900">Recent Activity</h3>
              
              <div className="space-y-4">
                {activityLog.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 border border-slate-200 rounded-lg">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Activity className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">{activity.action}</p>
                      <p className="text-sm text-slate-500">{activity.details}</p>
                      <p className="text-xs text-slate-400 mt-1">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-900">Security Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900">Admin Password</p>
                    <p className="text-sm text-slate-500">Last changed 15 days ago</p>
                  </div>
                  <button className="btn btn-ghost">Change Password</button>
                </div>

                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900">Two-Factor Authentication</p>
                    <p className="text-sm text-slate-500">Required for admin accounts</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-green-600 bg-green-100">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Enabled
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900">API Access Keys</p>
                    <p className="text-sm text-slate-500">Manage API keys for integrations</p>
                  </div>
                  <button className="btn btn-ghost">Manage Keys</button>
                </div>

                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900">Audit Log Access</p>
                    <p className="text-sm text-slate-500">View detailed audit logs</p>
                  </div>
                  <button className="btn btn-ghost">View Logs</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;