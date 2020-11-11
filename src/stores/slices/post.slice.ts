import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PROPS_CREATE_POST } from '../../types';
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

interface SelectedPost {
  id: number;
  content: string;
  displayName: string;
}

interface InitialState {
  posts: Post[];
  selectedPost: SelectedPost;
}

const apiUrl = 'http://localhost:3000/';

export const fetchGetPosts = createAsyncThunk('post/getPosts', async () => {
  const res = await axios.get(`${apiUrl}post`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('localJwtToken')}`,
    },
  });
  return res.data;
});

export const fetchCreatePost = createAsyncThunk(
  'post/createPost',
  async (data: PROPS_CREATE_POST) => {
    const res = await axios.post(`${apiUrl}post`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('localJwtToken')}`,
      },
    });
    return res.data;
  }
);

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
    selectedPost: {
      id: 0,
      content: '',
      displayName: '',
    },
  } as InitialState,
  reducers: {
    setSelectedPost(state, action) {
      state.selectedPost = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetPosts.fulfilled, (state, action) => {
      return { ...state, posts: action.payload };
    });
    builder.addCase(fetchCreatePost.fulfilled, (state, action) => {
      return { ...state, posts: [...state.posts, action.payload] };
    });
  },
});

export const { setSelectedPost } = postSlice.actions;

export const selectPosts = (state: RootState) => state.post.posts;
export const selectSelectedPost = (state: RootState) => state.post.selectedPost;

export default postSlice.reducer;
