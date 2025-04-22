import { createSlice /*, PayloadAction */ } from '@reduxjs/toolkit';

export interface IRecipeReducer {
  name: string;
  email: string;
  isFetching: boolean;
}

const initialState: IRecipeReducer = {
  name: '',
  email: '',
  isFetching: false,
};

export const recipeSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {},
  selectors: {},
});

export const {
  actions: recipeActions,
  selectors: recipeSelectors,
  reducer: recipeReducer,
} = recipeSlice;
