import type { FC } from 'react';
import styles from './page.module.scss';
import Registration from '@/components/pages/registartion';

const RegistrationPage: FC = () => (
  <div className={styles.page}>
    <Registration />
  </div>
);

export default RegistrationPage;
