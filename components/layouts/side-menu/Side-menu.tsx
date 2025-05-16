import { FC } from 'react';
import Link from 'next/link';
import styles from './Side-menu.module.scss';

export const SideMenu: FC = () => {
  return (
    <div className={styles.wrapper}>
      <h2>Menu</h2>
      <nav className="links">
        <ul>
          <ol>
            <Link href="/"> Home</Link>
          </ol>
          <ol>
            <Link href="/new-recipe"> Create Recipe</Link>
          </ol>
          <ol>
            <Link href="/about"> About</Link>
          </ol>
          <ol>
            <Link href="/2"> Details</Link>
          </ol>
        </ul>
      </nav>
    </div>
  );
};
