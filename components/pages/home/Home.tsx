import Recipes from '@/components/blocks/recipes/Recipes';
import styles from './Home.module.scss';

export default function Home() {
  return (
    <div className={styles.home}>
      <main className={styles.main}>
        <h1>Home page</h1>

        <h2>To Do</h2>
        <Recipes />
      </main>
    </div>
  );
}
