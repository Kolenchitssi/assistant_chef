import { FC } from 'react';
import Image from 'next/image';
import { IngredientKeys, IRecipe, RecipeKeys } from '@/core/recipe';

import styles from './Recipe-card.module.scss';

export interface RecipeDetailsCardProps {
  recipe: IRecipe;
}

const RecipeDetailsCard: FC<RecipeDetailsCardProps> = ({
  recipe,
}) => {
  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>
          {recipe[RecipeKeys.recipeName]}
        </h1>
        {recipe[RecipeKeys.imgUrl] && (
          <Image
            width={240}
            height={280}
            src={recipe[RecipeKeys.imgUrl]}
            alt={recipe[RecipeKeys.recipeName]}
            className={styles.recipeImage}
          />
        )}
      </div>
      <div className={styles.info}>
        <h2>Description</h2>
        <p className={styles.description}>
          {recipe[RecipeKeys.recipeDescription]}
        </p>
        <div className={styles.metadata}>
          <span>Servings: {'servings'}</span>
          <span>Cooking Time: {'cookingTime'} minutes</span>
        </div>
      </div>
      <div className={styles.ingredients}>
        <h2>Main Ingredients</h2>
        <span>
          {recipe[RecipeKeys.mainIngredient][IngredientKeys.name]}:
          {recipe[RecipeKeys.mainIngredient][IngredientKeys.quantity]}
          {
            recipe[RecipeKeys.mainIngredient][
              IngredientKeys.unitOfMeasurement
            ]
          }
        </span>
      </div>
      <div className={styles.ingredients}>
        <h2>Ingredients</h2>
        <ul>
          {recipe[RecipeKeys.ingredients].map((ingredient) => (
            <li key={ingredient[IngredientKeys.name]}>
              {ingredient[IngredientKeys.name]}:{' '}
              {ingredient[IngredientKeys.quantity]}
              {ingredient[IngredientKeys.unitOfMeasurement]}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default RecipeDetailsCard;
