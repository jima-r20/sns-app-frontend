import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  PROPS_APPROVE_REQUEST,
  PROPS_CREATE_REQUEST,
} from '../../interfaces/slice-props.interface';
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

// const apiUrl = process.env.REACT_APP_DEV_API_URL;
const apiUrl = process.env.REACT_APP_PRD_API_URL;

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
          新規フォロー
============================ */
export const fetchCreateFollow = createAsyncThunk(
  'post/createFollow',
  async (data: PROPS_CREATE_REQUEST) => {
    const res = await axios.post(`${apiUrl}follow/request`, data, {
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
          フォローの解除
============================ */
export const fetchDeleteFollow = createAsyncThunk(
  'delete/deleteFollow',
  async (id: number) => {
    await axios.delete(`${apiUrl}follow/request/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('localJwtToken')}`,
      },
    });
    /*  
      APIを叩いた時にレスポンスとしてオブジェクトを返さないので、
      storeから該当オブジェクトを削除するために引数のidをaction.payloadとして返す
     */
    return id;
  }
);

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
    builder.addCase(fetchCreateFollow.fulfilled, (state, action) => {
      return { ...state, follows: [...state.follows, action.payload] };
    });
    builder.addCase(fetchApproveRequest.fulfilled, (state, action) => {
      const { approved } = action.payload;
      if (approved) {
        return {
          ...state,
          friends: [...state.friends, action.payload],
        };
      }
      if (!approved) {
        return {
          ...state,
          friends: state.friends.filter(
            (friend) => friend.id !== action.payload.id
          ),
        };
      }
    });
    builder.addCase(fetchDeleteFollow.fulfilled, (state, action) => {
      return {
        ...state,
        follows: state.follows.filter((follow) => follow.id !== action.payload),
      };
    });
  },
});

export const selectFollows = (state: RootState) => state.follow.follows;
export const selectFollowers = (state: RootState) => state.follow.followers;
export const selectFriends = (state: RootState) => state.follow.friends;

export default followSlice.reducer;
