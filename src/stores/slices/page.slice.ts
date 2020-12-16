import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface PageSliceState {
  subHeaderTitle: string;
  isOpenSideBar: boolean;
  isPostSelected: boolean;
  isDMSelected: boolean;
  isApproveOrUnfollowButtomClicked: boolean;
  sendToReceiver: number | null;
  isCreatePostPage: boolean;
}

export const pageSlice = createSlice({
  name: 'page',
  initialState: {
    subHeaderTitle: '',
    isOpenSideBar: true,
    isPostSelected: false,
    isDMSelected: false,
    isApproveOrUnfollowButtomClicked: false,
    sendToReceiver: null,
    isCreatePostPage: false,
  } as PageSliceState,
  reducers: {
    setSubHeaderTitle(state, action) {
      state.subHeaderTitle = action.payload;
    },
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
    setApproveOrUnfollowButtomClicked(state) {
      state.isApproveOrUnfollowButtomClicked = true;
    },
    resetApproveOrUnfollowButtomClicked(state) {
      state.isApproveOrUnfollowButtomClicked = false;
    },
    setSendToReceiver(state, action) {
      state.sendToReceiver = action.payload;
    },
    resetSendToReceiver(state) {
      state.sendToReceiver = null;
    },
    setIsCreatePostPage(state) {
      state.isCreatePostPage = true;
    },
    resetIsCreatePostPage(state) {
      state.isCreatePostPage = false;
    },
  },
});

export const {
  setSubHeaderTitle,
  openSideBar,
  closeSideBar,
  setPostSelected,
  resetPostSelected,
  setDMSelected,
  resetDMSelected,
  setApproveOrUnfollowButtomClicked,
  resetApproveOrUnfollowButtomClicked,
  setSendToReceiver,
  resetSendToReceiver,
  setIsCreatePostPage,
  resetIsCreatePostPage,
} = pageSlice.actions;

export const selectSubHeaderTitle = (state: RootState) =>
  state.page.subHeaderTitle;
export const selectIsOpenSideBar = (state: RootState) =>
  state.page.isOpenSideBar;
export const selectIsPostSelected = (state: RootState) =>
  state.page.isPostSelected;
export const selectIsDMSelected = (state: RootState) => state.page.isDMSelected;
export const selectIsApproveOrUnfollowButtomClicked = (state: RootState) =>
  state.page.isApproveOrUnfollowButtomClicked;
export const selectSendToReceiver = (state: RootState) =>
  state.page.sendToReceiver;
export const selectIsCreatePostPage = (state: RootState) =>
  state.page.isCreatePostPage;

export default pageSlice.reducer;
