export enum IngredientKeys {
  name = 'name',
  quantity = 'quantity',
  unitOfMeasurement = 'unitOfMeasurement',
}
export interface IIngredient {
  [IngredientKeys.name]: string;
  [IngredientKeys.quantity]: number;
  [IngredientKeys.unitOfMeasurement]: string;
}

export enum RecipeKeys {
  recipeID = 'recipeID',
  recipeName = 'Name',
  recipeDescription = 'description',
  ingredients = 'ingredients',
  mainIngredient = 'mainIngredient',
}

export interface IRecipe {
  [RecipeKeys.recipeID]: string;
  [RecipeKeys.recipeName]: string;
  [RecipeKeys.recipeDescription]: string;
  [RecipeKeys.ingredients]: IIngredient[];
  [RecipeKeys.mainIngredient]: IIngredient;
}

export const DEFAULT_RECIPE = {
  [RecipeKeys.recipeID]: '',
  [RecipeKeys.recipeName]: '',
  [RecipeKeys.recipeDescription]: '',
  [RecipeKeys.ingredients]: [],
  [RecipeKeys.mainIngredient]: '',
};
