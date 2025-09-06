import React, { useState, useEffect } from 'react';
import { getLoans, getNotifications } from '../../api/mock';
import { Loan, Notification } from '../../types/dashboard';
import { Link } from 'react-router-dom';
import { Bell, CheckCircle, Clock } from 'lucide-react';

const UserDashboard: React.FC = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [loansData, notificationsData] = await Promise.all([getLoans(), getNotifications()]);
      setLoans(loansData);
      setNotifications(notificationsData);
    };

    fetchData();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">My Loans</h2>
              <div className="space-y-4">
                {loans.map((loan) => (
                  <div key={loan.id} className="p-4 border rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{loan.sector} Loan</p>
                      <p className="text-sm text-gray-500">Applied on: {new Date(loan.applicationDate).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(loan.status)}
                      <span className="capitalize">{loan.status}</span>
                    </div>
                    <Link to={`/loan-details/${loan.id}`} className="text-blue-600 hover:underline">View Details</Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Bell className="w-6 h-6 mr-2" /> Notifications
            </h2>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="p-4 border-l-4 border-blue-500 bg-blue-50">
                  <p className="font-semibold">{notification.message}</p>
                  <p className="text-sm text-gray-500">{new Date(notification.date).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
