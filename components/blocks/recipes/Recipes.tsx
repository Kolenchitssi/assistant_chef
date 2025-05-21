'use client';

import { IRecipe } from '@/core/recipe';
import { getDataArrayFromFirebase } from '@/utils/getDataArrayFromFirebase/getDataArrayFromFirebase';
import { useState, useEffect } from 'react';
import RecipesTable from './resipes-table/Recipes-table';

function Recipes() {
  const [recipes, setRecipes] = useState([] as IRecipe[]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const getListWithUrlsImg = async () => {
    try {
      setLoading(true);
      const recipes =
        await getDataArrayFromFirebase<IRecipe>('recipes');
      console.log('recipes', recipes);
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
    <div className="recipes">
      <RecipesTable recipes={recipes} />
    </div>
  );
}

export default Recipes;
