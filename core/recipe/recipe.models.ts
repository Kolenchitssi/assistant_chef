export enum RecipeKeys {
  recipeID = 'recipeID',
  recipeName = 'Name',
  recipeDescription = 'description',
  ingredients = 'ingredients',
  mainIngredient = 'mainIngredient',
}

export interface IIngredient {
  name: string;
  quantity: number;
  unitOfMeasurement: string;
}

export interface IRecipe {
  [RecipeKeys.recipeID]: string;
  [RecipeKeys.recipeName]: string;
  [RecipeKeys.recipeDescription]: string;
  [RecipeKeys.ingredients]: IIngredient[];
  [RecipeKeys.mainIngredient]: string;
}

export const DEFAULT_RECIPE = {
  [RecipeKeys.recipeID]: '',
  [RecipeKeys.recipeName]: '',
  [RecipeKeys.recipeDescription]: '',
  [RecipeKeys.ingredients]: [],
  [RecipeKeys.mainIngredient]: '',
};
