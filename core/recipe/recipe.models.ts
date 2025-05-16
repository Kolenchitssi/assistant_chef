export enum RecipeKeys {
  recipeID = 'recipeID',
  recipeName = 'recipeName',
  recipeDescription = 'recipeDescription',
}

export interface IRecipe {
  [RecipeKeys.recipeID]: string;
  [RecipeKeys.recipeName]: string;
  [RecipeKeys.recipeDescription]: string;
}
