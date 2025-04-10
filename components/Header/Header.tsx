'use client';

import { FC } from 'react';
// import Link from 'next/link';
import Image from 'next/image';
import {
  // Button,
  useMantineColorScheme,
  useComputedColorScheme,
  ActionIcon,
} from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import cx from 'clsx';
import styles from './Header.module.scss';

export const Header: FC = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');
  const isLightScheme = computedColorScheme === 'light';
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

      {/* <Link href="/about"> About</Link> */}
      {/* <Button>Default button test</Button>
      <Button color="green" variant="filled">
        Button with props
      </Button> */}
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
            <IconSun
              className={cx(styles.icon, styles.light)}
              stroke={1.5}
            />
          )}
          {!isLightScheme && (
            <IconMoon
              className={cx(styles.icon, styles.dark)}
              stroke={1.5}
            />
          )}
        </ActionIcon>
      </div>
    </header>
  );
};
