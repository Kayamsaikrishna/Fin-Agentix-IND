import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Menu,
  X,
  Home,
  User,
  FileText,
  CreditCard,
  Settings,
  LogOut,
  Bell,
  Search,
  ChevronDown,
  Shield,
  BarChart3,
  Users,
  Building2,
  Briefcase,
  Car,
  GraduationCap,
  Leaf,
  Gem,
  HeartPulse,
  Smartphone,
  Bike,
  Calculator,
  HelpCircle,
  ChevronRight,
} from 'lucide-react';
import FinAgentixLogo from '../../assets/fin-agentix-logo.jpeg';

const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const userNavItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Apply for Loan', href: '/loans/apply', icon: FileText },
    { name: 'My Applications', href: '/loans/my-applications', icon: Briefcase },
    { name: 'Documents', href: '/documents', icon: FileText },
    { name: 'EMI Calculator', href: '/calculator', icon: Calculator },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Help & Support', href: '/support', icon: HelpCircle },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const adminNavItems = [
    { name: 'Admin Dashboard', href: '/admin/dashboard', icon: BarChart3 },
    { name: 'User Management', href: '/admin/users', icon: Users },
    { name: 'Loan Management', href: '/admin/loans', icon: Briefcase },
    { 
      name: 'Loan Sectors', 
      href: '/admin/sectors', 
      icon: Shield,
      subItems: [
        { name: 'Personal Loans', href: '/admin/sectors/personal', icon: User },
        { name: 'Home Loans', href: '/admin/sectors/home', icon: Home },
        { name: 'Vehicle Loans', href: '/admin/sectors/vehicle', icon: Car },
        { name: 'Business Loans', href: '/admin/sectors/business', icon: Briefcase },
        { name: 'Education Loans', href: '/admin/sectors/education', icon: GraduationCap },
        { name: 'Agriculture Loans', href: '/admin/sectors/agriculture', icon: Leaf },
        { name: 'Gold Loans', href: '/admin/sectors/gold', icon: Gem },
        { name: 'Healthcare Loans', href: '/admin/sectors/healthcare', icon: HeartPulse },
        { name: 'Credit Cards', href: '/admin/sectors/credit-cards', icon: CreditCard },
        { name: 'Two Wheeler', href: '/admin/sectors/two-wheeler', icon: Bike },
        { name: 'Digital Loans', href: '/admin/sectors/digital', icon: Smartphone },
        { name: 'Microfinance', href: '/admin/sectors/microfinance', icon: Users },
      ]
    },
    { name: 'Scheme Management', href: '/admin/schemes', icon: Building2 },
    { name: 'Analytics & Reports', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Compliance', href: '/admin/compliance', icon: Shield },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const navItems = user?.role === 'admin' ? adminNavItems : userNavItems;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  const toggleSubmenu = (itemName: string) => {
    setExpandedMenus(prev => 
      prev.includes(itemName) 
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200">
          <div className="flex items-center">
            <img src={FinAgentixLogo} alt="Fin-Agentix" className="w-8 h-8 rounded-lg" />
            <span className="ml-3 text-xl font-bold text-slate-900">Fin-Agentix</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-6 px-3 flex-1 overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.subItems ? (
                  <div>
                    <button
                      onClick={() => toggleSubmenu(item.name)}
                      className={`group flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        expandedMenus.includes(item.name) || location.pathname.startsWith(item.href)
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center">
                        <item.icon className={`mr-3 h-5 w-5 ${
                          expandedMenus.includes(item.name) || location.pathname.startsWith(item.href) 
                            ? 'text-blue-600' 
                            : 'text-slate-400 group-hover:text-slate-600'
                        }`} />
                        {item.name}
                      </div>
                      <ChevronRight className={`h-4 w-4 transition-transform ${
                        expandedMenus.includes(item.name) ? 'rotate-90' : ''
                      }`} />
                    </button>
                    {expandedMenus.includes(item.name) && (
                      <div className="ml-6 mt-1 space-y-1">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className={`group flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                              isActive(subItem.href)
                                ? 'bg-blue-50 text-blue-700'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                            }`}
                            onClick={() => setSidebarOpen(false)}
                          >
                            <subItem.icon className="mr-3 h-4 w-4" />
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive(item.href)
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className={`mr-3 h-5 w-5 ${
                      isActive(item.href) ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'
                    }`} />
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* User info at bottom */}
        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user?.fullName?.charAt(0) || 'U'}
                </span>
              </div>
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">
                {user?.fullName}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {user?.role === 'admin' ? 'Administrator' : 'User Account'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-30">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-slate-400 hover:text-slate-600"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              <div className="hidden lg:flex items-center ml-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search applications, users, schemes..."
                    className="pl-10 pr-4 py-2 w-80 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="p-2 text-slate-400 hover:text-slate-600 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
              </button>

              {/* Profile dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user?.fullName?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-slate-900">{user?.fullName}</p>
                    <p className="text-xs text-slate-500">{user?.role === 'admin' ? 'Administrator' : 'User'}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <User className="mr-3 h-4 w-4" />
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <Settings className="mr-3 h-4 w-4" />
                      Settings
                    </Link>
                    <hr className="my-1" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;