import {
  configureStore,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';
// import commonReducer, {
//   commonSliceActions,
// } from '../../features/common/commonSlice';
import { userReducer, userActions } from '../user/user-slice';
// import * as userAsyncActions from '..//user/user-action-creator';
import { recipeReducer, recipeActions } from '../recipe/recipe-slice';

export const makeStore = () => {
  return configureStore({
    // Automatically calls `combineReducers`
    reducer: {
      // common: commonReducer,
      user: userReducer,
      recipe: recipeReducer,
    },
  });
};

export const rootActions = {
  ...userActions,
  // ...userAsyncActions,
  ...recipeActions,
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

// this variant for React but not Next
// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;

//? need AppThunk?
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
