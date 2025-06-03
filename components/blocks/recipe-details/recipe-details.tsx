'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { getDataByIdFromFirebase } from '@/utils/getDataFromFirebase/getDataFromFirebase';
import { IngredientKeys, IRecipe, RecipeKeys } from '@/core/recipe';
// import { useParams } from 'next/navigation';

import styles from './recipe-details.module.scss';

interface RecipeDetailsProps {
  recipeID: string;
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({
  recipeID,
}) => {
  // const params = useParams() as { [key: string]: string };
  // const { id } = params;

  const [recipe, setRecipe] = useState<IRecipe | null>();
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const getRecipe = async () => {
      try {
        setLoading(true);
        const recipe = await getDataByIdFromFirebase<IRecipe>(
          'recipes',
          recipeID,
        );
        console.log('recipe', recipe);
        setRecipe(recipe);
        setLoading(false);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setErrorMsg(err.message);
        } else {
          setErrorMsg('Error getting recipe');
          setLoading(false);
        }
      }
    };
    getRecipe();
  }, [recipeID]);

  if (loading) return <div>Loading...</div>;
  if (errorMsg) return <div>Error: {errorMsg}</div>;
  return (
    <div className={styles.recipeDetails}>
      {recipe ? (
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
              {recipe[RecipeKeys.mainIngredient][IngredientKeys.name]}
              :
              {
                recipe[RecipeKeys.mainIngredient][
                  IngredientKeys.quantity
                ]
              }
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
      ) : (
        <span> Recipe not found</span>
      )}
    </div>
  );
};

export default RecipeDetails;
