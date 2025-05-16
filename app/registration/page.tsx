import { FC } from 'react';
import styles from './page.module.scss';
import Registration from '@/utils/upload-file/temp';

const RegistrationPage: FC = () => (
  <div className={styles.page}>
    <Registration />
  </div>
);

export default RegistrationPage;
