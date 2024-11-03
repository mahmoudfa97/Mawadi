import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    axios.get('/admin/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  const toggleBlockUser = (userId: string) => {
    axios.patch(`/admin/users/${userId}/block`)
      .then(() => {
        setUsers(users.map(user => user._id === userId ? { ...user, isBlocked: !user.isBlocked } : user));
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Manage Users</h2>
      <ul>
        {users.map((user: any) => (
          <li key={user._id}>
            {user.email} - {user.isBlocked ? 'Blocked' : 'Active'}
            <button onClick={() => toggleBlockUser(user._id)}>{user.isBlocked ? 'Unblock' : 'Block'}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageUsers;
