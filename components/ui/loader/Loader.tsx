import type { FC } from 'react';
import { Loader as IconLoader } from 'lucide-react';
import styles from './Loader.module.scss';

export const Loader: FC = () => (
  <IconLoader className={styles.loader} />
);
