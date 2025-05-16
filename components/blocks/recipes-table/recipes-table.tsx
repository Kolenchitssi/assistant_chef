'use client';

import { IRecipe } from '@/core/recipe';
import { getDataArrayFromFirebase } from '@/utils/getDataArrayFromFirebase/getDataArrayFromFirebase';
import { useState, useEffect } from 'react';

function RecipesTable() {
  const [recipes, setRecipes] = useState([] as IRecipe[]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const getListWithUrlsImg = async () => {
    try {
      setLoading(true);
      const recipes =
        await getDataArrayFromFirebase<IRecipe>('recipes');
      setRecipes(recipes);
      setLoading(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('Error getting recipes');
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getListWithUrlsImg();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (errorMsg) return <div>Error: {errorMsg}</div>;

  return (
    <ul>
      {recipes.map((recipe, index) => (
        <li key={index}>{recipe.recipeName}</li>
      ))}
    </ul>
  );
}

export default RecipesTable;
