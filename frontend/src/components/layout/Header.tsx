
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, UserCircle } from 'lucide-react';

const Header: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="h-16 bg-white shadow-md flex items-center justify-end px-6">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <select
            onChange={(e) => changeLanguage(e.target.value)}
            className="bg-transparent text-gray-600"
            defaultValue={i18n.language}
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
          </select>
        </div>
        <Bell className="text-gray-600" />
        <UserCircle className="text-gray-600" />
      </div>
    </header>
  );
};

export default Header;
