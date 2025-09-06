
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getUser, User } from '../../api/mock';

const UserDetails: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        const userData = await getUser(id);
        setUser(userData);
      };
      fetchUser();
    }
  }, [id]);

  if (!user) {
    return <div>{t('loading')}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{user.name}</h2>
      {/* Display user details */}
    </div>
  );
};

export default UserDetails;
