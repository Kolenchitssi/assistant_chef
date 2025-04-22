import {
  combineReducers,
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

const rootReducer = combineReducers({
  // common: commonReducer,
  user: userReducer,
  recipe: recipeReducer,
});
export const store = configureStore({
  reducer: rootReducer,
});

export const rootActions = {
  ...userActions,
  // ...userAsyncActions,
  ...recipeActions,
};

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
