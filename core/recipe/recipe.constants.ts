import { IngredientKeys } from './recipe.models';

export const INGREDIENT_INITIAL_VALUE = {
  [IngredientKeys.name]: '',
  [IngredientKeys.quantity]: 0,
  [IngredientKeys.unitOfMeasurement]: 'g',
};

export const UOM = ['g', 'kg', 'ml', 'l', 'pcs', 'tbsp', 'tsp'];
