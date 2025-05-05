import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@firebase/auth';
// import { IUser } from '../recipe';

export interface IUserReducer {
  userData: User | null; // IUser;
  isFetching: boolean;
  isAuth: boolean;
  isUserLoading: boolean;
}

const initialState: IUserReducer = {
  userData: null,
  isFetching: false,
  isAuth: false,
  isUserLoading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.userData = action.payload;
    },
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isUserLoading = action.payload;
    },
  },
  selectors: {},
});

export const {
  actions: userActions,
  selectors: userSelectors,
  reducer: userReducer,
} = userSlice;
