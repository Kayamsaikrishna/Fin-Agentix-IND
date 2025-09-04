// src/pages/Settings.tsx
// TODO: Implement Settings.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, User, Mail, Phone, Lock, Bell, Trash2, LogOut, Settings as SettingsIcon, Eye, EyeOff 
} from 'lucide-react';

// --- Reusable Components ---
const Header = () => (
  <header className="bg-white shadow-md sticky top-0 z-50">
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex-shrink-0">
          <Link to="/loans" className="flex items-center text-blue-600">
            <ShieldCheck className="w-8 h-8 mr-2" />
            <span className="text-2xl font-bold">Fin-Agentix</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
            <span className="font-medium text-gray-700">Welcome, Anjali!</span>
            <Link to="/profile" title="Profile"><User className="w-6 h-6 text-gray-600 hover:text-blue-600"/></Link>
            <Link to="/login" title="Logout"><LogOut className="w-6 h-6 text-gray-600 hover:text-blue-600"/></Link>
        </div>
      </div>
    </nav>
  </header>
);

const Footer = () => (
    <footer className="bg-gray-800 text-white mt-auto">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Fin-Agentix India. All Rights Reserved.
        </div>
    </footer>
);

// --- Child Components for the Settings Page ---

const SettingsCard = ({ title, icon: Icon, children }) => (
    <div className="bg-white rounded-xl shadow-md">
        <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 flex items-center">
                <Icon className="w-6 h-6 mr-3 text-blue-600" />
                {title}
            </h3>
        </div>
        <div className="p-6 space-y-4">
            {children}
        </div>
    </div>
);

const ToggleSwitch = ({ label, enabled, setEnabled }) => (
    <div className="flex items-center justify-between">
        <span className="text-gray-600">{label}</span>
        <button
            onClick={() => setEnabled(!enabled)}
            className={`${
                enabled ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
        >
            <span className={`${
                enabled ? 'translate-x-6' : 'translate-x-1'
            } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`} />
        </button>
    </div>
);


// --- Main Settings Page Component ---
const Settings: React.FC = () => {
    const [notifications, setNotifications] = useState({
        email: true,
        sms: true,
        push: false,
    });
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <main className="flex-grow">
                <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Account Settings</h1>
                    
                    <div className="space-y-8">
                        {/* Personal Information */}
                        <SettingsCard title="Personal Information" icon={User}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input type="text" defaultValue="Anjali Sharma" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input type="email" defaultValue="anjali.s@example.com" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <div className="flex mt-1">
                                    <input type="text" defaultValue="+91 98XXXXXX01" className="flex-grow block w-full border-gray-300 rounded-l-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
                                    <button className="bg-gray-200 text-gray-700 px-4 rounded-r-md hover:bg-gray-300 font-semibold text-sm">Verify</button>
                                </div>
                            </div>
                            <button className="w-full md:w-auto bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                                Save Changes
                            </button>
                        </SettingsCard>

                        {/* Security */}
                        <SettingsCard title="Security" icon={ShieldCheck}>
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700">Current Password</label>
                                <input type={showCurrentPassword ? "text" : "password"} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                                <button onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-gray-500">
                                    {showCurrentPassword ? <EyeOff/> : <Eye/>}
                                </button>
                            </div>
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700">New Password</label>
                                <input type={showNewPassword ? "text" : "password"} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                                <button onClick={() => setShowNewPassword(!showNewPassword)} className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-gray-500">
                                    {showNewPassword ? <EyeOff/> : <Eye/>}
                                </button>
                            </div>
                             <button className="w-full md:w-auto bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                                Change Password
                            </button>
                            <hr/>
                            <ToggleSwitch label="Two-Factor Authentication (2FA)" enabled={false} setEnabled={() => {}} />
                        </SettingsCard>

                        {/* Notifications */}
                        <SettingsCard title="Notifications" icon={Bell}>
                            <ToggleSwitch label="Email Notifications" enabled={notifications.email} setEnabled={(val) => setNotifications(p => ({...p, email: val}))} />
                            <ToggleSwitch label="SMS Notifications" enabled={notifications.sms} setEnabled={(val) => setNotifications(p => ({...p, sms: val}))} />
                            <ToggleSwitch label="Push Notifications" enabled={notifications.push} setEnabled={(val) => setNotifications(p => ({...p, push: val}))} />
                             <button className="w-full md:w-auto bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                                Save Preferences
                            </button>
                        </SettingsCard>

                        {/* Account Deletion */}
                         <SettingsCard title="Account Actions" icon={Trash2}>
                            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <Trash2 className="h-5 w-5 text-red-400" aria-hidden="true" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-red-700">
                                            Deleting your account is a permanent action and cannot be undone. All your data will be erased.
                                        </p>
                                    </div>
                                </div>
                            </div>
                             <button className="w-full md:w-auto bg-red-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-700 transition-colors">
                                Close My Account
                            </button>
                        </SettingsCard>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Settings;
