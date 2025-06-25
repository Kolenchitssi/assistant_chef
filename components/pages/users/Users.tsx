'use client';

import { getDataArrayFromFirebase } from '@/utils/get-data-from-firebase/get-data-from-firebase';
import { useState, useEffect } from 'react';
import styles from './Users.module.scss';
import UsersTable from './users-table/users-table';
import type { IUser } from '@/core/user';

export default function Home() {
  const [users, setUsers] = useState([] as IUser[]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const getUsersList = async () => {
    try {
      setLoading(true);
      const users = await getDataArrayFromFirebase<IUser>('allUsers');
      console.log('users', users);
      setUsers(users);
      setLoading(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('Error getting users');
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <div className={styles.users}>
      <h2>Users: </h2>
      {loading && <div>Loading...</div>}
      {errorMsg && <div>Error: {errorMsg}</div>}
      <UsersTable users={users} />
    </div>
  );
}
