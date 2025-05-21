import { IngredientKeys, IRecipe, RecipeKeys } from '@/core/recipe';
import { getUniqueValuesFromArrOfObj } from '@/utils/getUniqueValues/getUniqueValues';

// Получение уникальных ингредиентов для выпадающего списка
export const getUniqueIngredients = (recipes: IRecipe[] = []) => {
  console.log('recipes', recipes);
  const allIngredients = recipes.flatMap((recipe) =>
    recipe.ingredients.map((item) => item.name),
  );
  return Array.from(new Set(allIngredients)).sort();
};

export const getUniqueMainIngredients = (recipes: IRecipe[] = []) => {
  const allMainIngredients = recipes.map(
    (recipe) => recipe[RecipeKeys.mainIngredient],
  );
  return getUniqueValuesFromArrOfObj(
    allMainIngredients,
    IngredientKeys.name,
  ).sort();
};
