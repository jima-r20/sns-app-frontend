import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

interface User {
  id: number;
  displayName: string;
  avatar: string;
  about: string;
}

interface Post {
  id: number;
  content: string;
  postFromId: number;
  postFrom: User;
}

interface InitialState {
  posts: Post[];
}

const apiUrl = 'http://localhost:3000/';

export const fetchGetPosts = createAsyncThunk('post/getPosts', async () => {
  const res = await axios.get(`${apiUrl}post`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('localJwtToken')}`,
    },
  });
  console.log(res.data);
  return res.data;
});

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [
      {
        id: 0,
        content: '',
        postFromId: 0,
        postFrom: {
          id: 0,
          displayName: '',
          avatar: '',
          about: '',
        },
      },
    ],
  } as InitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGetPosts.fulfilled, (state, action) => {
      return { ...state, posts: action.payload };
    });
  },
});

export const selectPosts = (state: RootState) => state.post.posts;

export default postSlice.reducer;
