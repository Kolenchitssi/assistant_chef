import { useMemo } from 'react';
import {
  // TypedUseSelectorHook,
  useDispatch,
  useSelector,
  useStore,
} from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import {
  type AppStore,
  type RootState,
  type AppDispatch,
  rootActions,
} from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> =
//   useSelector;

//? need useAppAction?
export const useAppAction = () => {
  const dispatch = useAppDispatch();
  return useMemo(
    () => bindActionCreators(rootActions, dispatch),
    [dispatch],
  );
};
