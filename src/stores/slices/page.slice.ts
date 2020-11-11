import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface PageSliceState {
  isOpenSideBar: boolean;
  isPostSelected: boolean;
}

export const pageSlice = createSlice({
  name: 'page',
  initialState: {
    isOpenSideBar: true,
    isPostSelected: false,
  } as PageSliceState,
  reducers: {
    openSideBar(state) {
      state.isOpenSideBar = true;
    },
    closeSideBar(state) {
      state.isOpenSideBar = false;
    },
    setPostSelected(state) {
      state.isPostSelected = true;
    },
    resetPostSelected(state) {
      state.isPostSelected = false;
    },
  },
});

export const {
  openSideBar,
  closeSideBar,
  setPostSelected,
  resetPostSelected,
} = pageSlice.actions;

export const selectIsOpenSideBar = (state: RootState) =>
  state.page.isOpenSideBar;
export const selectIsPostSelected = (state: RootState) =>
  state.page.isPostSelected;

export default pageSlice.reducer;
