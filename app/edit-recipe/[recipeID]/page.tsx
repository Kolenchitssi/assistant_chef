import EditRecipe from '@/components/blocks/edit-recipe';
import styles from './page.module.scss';

type TProps = {
  params: Promise<{ recipeID: string }>;
};

export default async function EditRecipePage(props: TProps) {
  const params = await props.params;
  const { recipeID } = params;

  return (
    <div className={styles.page}>
      <EditRecipe recipeID={recipeID} />
    </div>
  );
}
