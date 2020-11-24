import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './slices/user.slice';
import postReducer from './slices/post.slice';
import pageReducer from './slices/page.slice';
import dmReducer from './slices/dm.slice';

export const store = configureStore({
  reducer: {
    page: pageReducer,
    user: userReducer,
    post: postReducer,
    dm: dmReducer,
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
