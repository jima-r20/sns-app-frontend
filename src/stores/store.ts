import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import counterReducer from './slices/counterSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,  // あとで消す
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppDispatch = typeof store.dispatch;
