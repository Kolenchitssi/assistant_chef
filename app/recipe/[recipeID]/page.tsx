import RecipeDetails from '@/components/blocks/recipe-details';
import styles from './page.module.scss';

type TProps = {
  params: Promise<{ recipeID: string }>;
};

export default async function RecipeDetailsPage(props: TProps) {
  const params = await props.params;
  const { recipeID } = params;

  return (
    <div className={styles.page}>
      <RecipeDetails recipeID={recipeID} />
    </div>
  );
}
