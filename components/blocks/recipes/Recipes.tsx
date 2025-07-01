'use client';

import type { IRecipe } from '@/core/recipe';
import { getDataArrayFromFirebase } from '@/utils/get-data-from-firebase/get-data-from-firebase';
import { useState, useEffect } from 'react';
import RecipesTable from './resipes-table/Recipes-table';
import { Loader } from '@/components/ui/loader';
import styles from './Recipes.module.scss';

function Recipes() {
  const [recipes, setRecipes] = useState([] as IRecipe[]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const getListWithUrlsImg = async () => {
    try {
      setLoading(true);
      const recipes =
        await getDataArrayFromFirebase<IRecipe>('recipes');
      console.log('recipes: ', recipes);
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

  return (
    <div className={styles.recipes}>
      {loading && <div>Loading...</div>}
      {errorMsg && <div>Error: {errorMsg}</div>}
      {!loading ? (
        <RecipesTable recipes={recipes} />
      ) : (
        <div className={styles.loader}>
          <Loader />
        </div>
      )}
    </div>
  );
}

export default Recipes;
