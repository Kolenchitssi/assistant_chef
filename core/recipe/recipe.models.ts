export enum IngredientKeys {
  key = 'key',
  name = 'name',
  quantity = 'quantity',
  unitOfMeasurement = 'unitOfMeasurement',
}
export interface IIngredient {
  [IngredientKeys.key]: string;
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
  imgUrl = 'imgUrl',
}

export interface IRecipe {
  [RecipeKeys.recipeID]?: string | null;
  [RecipeKeys.recipeName]: string;
  [RecipeKeys.recipeDescription]: string;
  [RecipeKeys.ingredients]: IIngredient[];
  [RecipeKeys.mainIngredient]: IIngredient;
  [RecipeKeys.imgUrl]: string | null;
}

export const DEFAULT_RECIPE = {
  [RecipeKeys.recipeID]: '',
  [RecipeKeys.recipeName]: '',
  [RecipeKeys.recipeDescription]: '',
  [RecipeKeys.ingredients]: [],
  [RecipeKeys.mainIngredient]: '',
};
