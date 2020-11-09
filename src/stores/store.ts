import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './slices/user.slice';
import postReducer from './slices/post.slice';
import pageReducer from './slices/page.slice';
import counterReducer from './slices/counterSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    page: pageReducer,
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
