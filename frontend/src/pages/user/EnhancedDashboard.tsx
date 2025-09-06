import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  User, 
  Settings, 
  LogOut, 
  Bell, 
  CreditCard, 
  CheckCircle, 
  ArrowRight,
  ShieldCheck,
  BarChart2,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const EnhancedDashboard: React.FC = () => {
  const { logout } = useAuth();

  const quickLinks = [
    { name: 'Apply for Loan', icon: FileText, path: '/apply' },
    { name: 'My Profile', icon: User, path: '/profile' },
    { name: 'Loan Status', icon: CheckCircle, path: '/loans' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex-shrink-0">
        <div className="p-6 text-2xl font-bold text-blue-600 border-b">
          <Link to="/dashboard">Fintech</Link>
        </div>
        <nav className="mt-6">
          <ul>
            <li><Link to="/dashboard" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 font-medium"><LayoutDashboard className="mr-3" /> Dashboard</Link></li>
            <li><Link to="/loans" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"><CreditCard className="mr-3" /> My Loans</Link></li>
            <li><Link to="/profile" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"><User className="mr-3" /> Profile</Link></li>
            <li><Link to="/settings" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"><Settings className="mr-3" /> Settings</Link></li>
            <li><Link to="/support" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"><HelpCircle className="mr-3" /> Support</Link></li>
          </ul>
        </nav>
        <div className="absolute bottom-0 w-64 border-t p-6">
          <button onClick={logout} className="flex items-center text-gray-700 hover:text-red-500 w-full">
            <LogOut className="mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back, User!</h1>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 rounded-full hover:bg-gray-100">
              <Bell className="text-gray-600" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <Link to="/profile">
              <img src="/placeholder-user.jpg" alt="User" className="w-10 h-10 rounded-full" />
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickLinks.map((link, index) => (
            <Link key={index} to={link.path} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow flex items-center space-x-4">
              <link.icon className="w-8 h-8 text-blue-500" />
              <div>
                <h3 className="font-semibold text-gray-800">{link.name}</h3>
                <p className="text-sm text-gray-500">Go to page</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Loan Overview</h2>
            <p className="text-gray-600">Graph placeholder</p>
            {/* Placeholder for a graph */}
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <BarChart2 className="w-16 h-16 text-gray-400" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4">KYC Status</h2>
            <div className="flex items-center p-4 bg-green-50 rounded-lg">
              <ShieldCheck className="w-8 h-8 text-green-500 mr-4" />
              <div>
                <h3 className="font-semibold text-green-800">Verified</h3>
                <p className="text-sm text-green-700">Your KYC is complete and verified.</p>
              </div>
            </div>
            <Link to="/kyc" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800">
              View Details <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EnhancedDashboard;
