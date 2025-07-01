import type { IUser } from '@/core/user';
import type { FC } from 'react';

interface IUserTableProps {
  users: IUser[];
}

const UsersTable: FC<IUserTableProps> = () => <div>Users table </div>;

export default UsersTable;
