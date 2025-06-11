'use client';

import React, { useEffect, useState } from 'react';

import { getDataByIdFromFirebase } from '@/utils/getDataFromFirebase/getDataFromFirebase';
import { IRecipe } from '@/core/recipe';
// import { useParams } from 'next/navigation';

import RecipeDetailsCard from './recipe-card';
import styles from './Recipe-details.module.scss';

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
        setLoading(false);
        if (err instanceof Error) {
          setErrorMsg(err.message);
        } else {
          setErrorMsg('Error getting recipe');
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
        <RecipeDetailsCard recipe={recipe} />
      ) : (
        <span> Recipe not found</span>
      )}
    </div>
  );
};

export default RecipeDetails;
