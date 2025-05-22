import { FC } from 'react';
import styles from './page.module.scss';
import Auth from '@/components/pages/auth';

const AuthPage: FC = () => (
  <div className={styles.page}>
    <Auth />
  </div>
);

export default AuthPage;
