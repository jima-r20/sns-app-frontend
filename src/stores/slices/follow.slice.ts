import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { PROPS_APPROVE_REQUEST } from '../../types';
import { RootState } from '../store';

interface Follow {
  id: number;
  askFrom: number;
  askTo: number;
  approved: boolean;
}

interface InitialState {
  follows: Follow[];
  followers: Follow[];
  friends: Follow[];
}

const apiUrl = 'http://localhost:3000/';

/* ============================
      フォロー情報の全取得
============================ */
export const fetchGetFollowList = createAsyncThunk(
  'follow/getFollowList',
  async () => {
    const res = await axios.get(`${apiUrl}follow/follow-list`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('localJwtToken')}`,
      },
    });
    return res.data;
  }
);

/* ============================
      フォロワー情報の全取得
============================ */
export const fetchGetFollowerList = createAsyncThunk(
  'follow/getFollowerList',
  async () => {
    const res = await axios.get(`${apiUrl}follow/follower-list`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('localJwtToken')}`,
      },
    });
    return res.data;
  }
);

/* ============================
      フレンド情報の全取得
============================ */
export const fetchGetFriendsList = createAsyncThunk(
  'follow/getFriendsList',
  async () => {
    const res = await axios.get(`${apiUrl}follow/friends-list`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('localJwtToken')}`,
      },
    });
    return res.data;
  }
);

/* ============================
      フォローリクエストの承認
============================ */
export const fetchApproveRequest = createAsyncThunk(
  'patch/approveRequest',
  async (data: PROPS_APPROVE_REQUEST) => {
    const res = await axios.patch(`${apiUrl}follow/request`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('localJwtToken')}`,
      },
    });
    return res.data;
  }
);

/* ============================
      フォローリクエストの拒否
============================ */

/* ============================
          ここからSlice
============================ */
export const followSlice = createSlice({
  name: 'follow',
  initialState: {
    follows: [
      {
        id: 0,
        askFrom: 0,
        askTo: 0,
        approved: false,
      },
    ],
    followers: [
      {
        id: 0,
        askFrom: 0,
        askTo: 0,
        approved: false,
      },
    ],
    friends: [
      {
        id: 0,
        askFrom: 0,
        askTo: 0,
        approved: false,
      },
    ],
  } as InitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGetFollowList.fulfilled, (state, action) => {
      return { ...state, follows: action.payload };
    });
    builder.addCase(fetchGetFollowerList.fulfilled, (state, action) => {
      return { ...state, followers: action.payload };
    });
    builder.addCase(fetchGetFriendsList.fulfilled, (state, action) => {
      return { ...state, friends: action.payload };
    });
    builder.addCase(fetchApproveRequest.fulfilled, (state, action) => {
      return {
        ...state,
        friends: [...state.friends, action.payload],
        followers: state.followers.filter(
          (follower) => follower.id !== action.payload.id
        ),
      };
    });
  },
});

export const selectFollows = (state: RootState) => state.follow.follows;
export const selectFollowers = (state: RootState) => state.follow.followers;
export const selectFriends = (state: RootState) => state.follow.friends;

export default followSlice.reducer;
