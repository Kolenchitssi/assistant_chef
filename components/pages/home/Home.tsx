import Recipes from '@/components/blocks/recipes/Recipes';
import styles from './Home.module.scss';

export default function Home() {
  return (
    <div className={styles.home}>
      <main className={styles.main}>
        <h2>Recipes: </h2>

        <Recipes />
      </main>
    </div>
  );
}
