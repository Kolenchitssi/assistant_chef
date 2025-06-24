import {
  type IRecipe,
  IngredientKeys,
  RecipeKeys,
} from '@/core/recipe';
import { getUniqueValuesFromArrOfObj } from '@/utils/get-unique-values/get-unique-values';

// Получение уникальных ингредиентов для выпадающего списка
export const getUniqueIngredients = (recipes: IRecipe[] = []) => {
  if (!recipes?.length) return [];
  const allIngredients = recipes.flatMap((recipe) =>
    recipe.ingredients.map((item) => item.name),
  );
  return Array.from(new Set(allIngredients)).sort();
};

export const getUniqueMainIngredients = (recipes: IRecipe[] = []) => {
  if (!recipes?.length) return [];
  const allMainIngredients = recipes.map(
    (recipe) => recipe[RecipeKeys.mainIngredient],
  );
  return getUniqueValuesFromArrOfObj(
    allMainIngredients,
    IngredientKeys.name,
  ).sort();
};
