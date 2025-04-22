import { createSlice /*, PayloadAction */ } from '@reduxjs/toolkit';

export interface IUserReducer {
  name: string;
  email: string;
  isFetching: boolean;
}

const initialState: IUserReducer = {
  name: '',
  email: '',
  isFetching: false,
};

export const userSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {},
  selectors: {},
});

export const {
  actions: userActions,
  selectors: userSelectors,
  reducer: userReducer,
} = userSlice;
