'use client';

import type { FC } from 'react';
import Link from 'next/link';
import { SIDE_MENU } from './side-menu.data';
import { usePathname } from 'next/navigation';
import cx from 'clsx';

import styles from './Side-menu.module.scss';

export const SideMenu: FC = () => {
  const pathName = usePathname();
  return (
    <div className={styles.wrapper}>
      <h2>Menu</h2>
      <nav className="links">
        <ul>
          {SIDE_MENU.map((item) => (
            <ol key={item.link}>
              <Link
                href={item.link}
                className={cx({
                  [styles.active]: pathName === item.link,
                })}
              >
                {item.name}
              </Link>
            </ol>
          ))}
        </ul>
      </nav>
    </div>
  );
};
