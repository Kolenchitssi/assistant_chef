'use client';

import { type FC, useState } from 'react';
import cx from 'clsx';
import { getAuth, signOut } from 'firebase/auth';
import { LogIn, LogOut } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { destroyCookie } from 'nookies';

import {
  useMantineColorScheme,
  useComputedColorScheme,
  ActionIcon,
} from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { useAppSelector, useAppAction } from '@/core/store/hooks';
import { initializeFirebase } from '@/utils/firebase/firebase';

import styles from './Header.module.scss';

export const Header: FC = () => {
  initializeFirebase(); //* need to check why initialization in utils/firebase.ts is not enough

  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');
  const isLightScheme = computedColorScheme === 'light';

  const { setUser, setIsAuth } = useAppAction();
  const userData = useAppSelector((state) => state.user.userData);
  const isAuth = useAppSelector((state) => state.user.isAuth);
  console.log('userData', userData);

  const auth = getAuth();
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogout = async () => {
    // comment for run commit test1
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setIsAuth(false);
        setErrorMsg('');
        setUser(null);
        // удаляем токен в cookies
        destroyCookie(null, 'firebaseToken', { path: '/' });
      })
      .catch((err) => {
        // An error happened.
        if (err instanceof Error) {
          setErrorMsg(err.message);
        } else {
          setErrorMsg('Logout error');
        }
      });
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoWrapper}>
        <Image
          className={styles.logo}
          src="/icon64.png"
          alt="logo"
          width={64}
          height={64}
          priority
        />
      </div>
      <h1 className={styles.title}>Assistant Chef</h1>
      <div className={styles.loginButton}>
        {isAuth ? (
          <span className={styles.logout} onClick={handleLogout}>
            Logout <LogOut />
          </span>
        ) : (
          <Link className={styles.login} href="/auth">
            Login <LogIn />
          </Link>
        )}
        <span className={styles.errMessage}>
          {errorMsg ? errorMsg : null}
        </span>
      </div>
      <div className={styles.controls}>
        <ActionIcon
          onClick={() =>
            setColorScheme(isLightScheme ? 'dark' : 'light')
          }
          variant="default"
          size="lg"
          aria-label="Toggle color scheme"
        >
          {isLightScheme && (
            <IconMoon
              className={cx(styles.icon, styles.light)}
              stroke={1.5}
            />
          )}
          {!isLightScheme && (
            <IconSun
              className={cx(styles.icon, styles.dark)}
              stroke={1.5}
            />
          )}
        </ActionIcon>
      </div>
    </header>
  );
};
