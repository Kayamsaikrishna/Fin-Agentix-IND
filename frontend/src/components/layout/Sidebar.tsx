import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Users, FileText, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar: React.FC = () => {
  const { logout } = useAuth();
  return (
    <aside className="w-64 bg-white text-gray-800 flex flex-col">
      <div className="h-16 flex items-center justify-center text-2xl font-bold">Fintech</div>
      <nav className="flex-1 px-4 py-8 space-y-2">
        <Link to="/dashboard" className="flex items-center px-4 py-2 text-lg font-medium rounded-md hover:bg-gray-100"><Home className="mr-3" /> Dashboard</Link>
        <Link to="/users" className="flex items-center px-4 py-2 text-lg font-medium rounded-md hover:bg-gray-100"><Users className="mr-3" /> Users</Link>
        <Link to="/reports" className="flex items-center px-4 py-2 text-lg font-medium rounded-md hover:bg-gray-100"><FileText className="mr-3" /> Reports</Link>
        <Link to="/settings" className="flex items-center px-4 py-2 text-lg font-medium rounded-md hover:bg-gray-100"><Settings className="mr-3" /> Settings</Link>
      </nav>
      <div className="p-4">
        <button onClick={logout} className="w-full flex items-center px-4 py-2 text-lg font-medium rounded-md hover:bg-red-500 hover:text-white"><LogOut className="mr-3" /> Logout</button>
      </div>
    </aside>
  );
};

export default Sidebar;
