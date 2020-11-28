import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface PageSliceState {
  isOpenSideBar: boolean;
  isPostSelected: boolean;
  isDMSelected: boolean;
  sendToReceiver: number | null;
}

export const pageSlice = createSlice({
  name: 'page',
  initialState: {
    isOpenSideBar: true,
    isPostSelected: false,
    isDMSelected: false,
    sendToReceiver: null,
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
    setDMSelected(state) {
      state.isDMSelected = true;
    },
    resetDMSelected(state) {
      state.isDMSelected = false;
    },
    setSendToReceiver(state, action) {
      state.sendToReceiver = action.payload;
    },
    resetSendToReceiver(state) {
      state.sendToReceiver = null;
    },
  },
});

export const {
  openSideBar,
  closeSideBar,
  setPostSelected,
  resetPostSelected,
  setDMSelected,
  resetDMSelected,
  setSendToReceiver,
  resetSendToReceiver,
} = pageSlice.actions;

export const selectIsOpenSideBar = (state: RootState) =>
  state.page.isOpenSideBar;
export const selectIsPostSelected = (state: RootState) =>
  state.page.isPostSelected;
export const selectIsDMSelected = (state: RootState) => state.page.isDMSelected;
export const selectSendToReceiver = (state: RootState) =>
  state.page.sendToReceiver;

export default pageSlice.reducer;
