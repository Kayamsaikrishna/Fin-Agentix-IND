
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getUsers, User } from '../../api/mock';

const UserList: React.FC = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const userData = await getUsers();
      setUsers(userData);
    };
    fetchUsers();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{t('user_list.title')}</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="flex justify-between items-center py-2 border-b">
            <span>{user.name}</span>
            {/* Add view/edit/delete buttons */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
