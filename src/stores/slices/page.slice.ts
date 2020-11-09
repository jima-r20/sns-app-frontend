import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface PageSliceState {
  isOpenSideBar: boolean;
}

export const pageSlice = createSlice({
  name: 'page',
  initialState: {
    isOpenSideBar: true
  } as PageSliceState,
  reducers: {
    openSideBar(state) {
      state.isOpenSideBar = true;
    },
    closeSideBar(state) {
      state.isOpenSideBar = false
    },
  },
});

export const {
  openSideBar,
  closeSideBar
} = pageSlice.actions;

export const selectIsOpenSideBar = (state: RootState) => state.page.isOpenSideBar

export default pageSlice.reducer;