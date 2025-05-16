import RecipesTable from '@/components/blocks/recipes-table/recipes-table';
import styles from './Home.module.scss';

export default function Home() {
  return (
    <div className={styles.home}>
      <main className={styles.main}>
        <h1>Home page</h1>

        <h2>To Do</h2>
        <RecipesTable />
      </main>
    </div>
  );
}
