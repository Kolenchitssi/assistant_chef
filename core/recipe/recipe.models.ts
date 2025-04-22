export enum RecipeKeys {
  recipeID = 'recipeID',
  recipeName = 'recipeName',
}

export interface IUser {
  [RecipeKeys.recipeID]: string;
  [RecipeKeys.recipeName]: string;
}
