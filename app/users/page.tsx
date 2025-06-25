import Users from '@/components/pages/users';
import styles from './page.module.scss';

export default function UsersPage() {
  console.log('page user');
  return (
    <div className={styles.page}>
      <Users />
    </div>
  );
}
