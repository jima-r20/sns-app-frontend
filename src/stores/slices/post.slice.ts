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
  postFromId: number;
  content: string;
  displayName: string;
}

interface InitialState {
  posts: Post[];
  myposts: Post[];
  userPosts: Post[];
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

export const fetchGetMyPosts = createAsyncThunk('post/getMyPosts', async () => {
  const res = await axios.get(`${apiUrl}post/myposts`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('localJwtToken')}`,
    },
  });
  return res.data;
});

export const fetchGetUserPosts = createAsyncThunk(
  'post/getUserPosts',
  async (id: number) => {
    const res = await axios.get(`${apiUrl}post/friend-posts/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('localJwtToken')}`,
      },
    });
    return res.data;
  }
);

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
    myposts: [
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
    userPosts: [
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
      postFromId: 0,
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
    builder.addCase(fetchGetMyPosts.fulfilled, (state, action) => {
      return { ...state, myposts: action.payload };
    });
    builder.addCase(fetchGetUserPosts.fulfilled, (state, action) => {
      return { ...state, userPosts: action.payload };
    });
    builder.addCase(fetchCreatePost.fulfilled, (state, action) => {
      return {
        ...state,
        posts: [...state.posts, action.payload],
        myposts: [...state.myposts, action.payload],
      };
    });
  },
});

export const { setSelectedPost } = postSlice.actions;

export const selectPosts = (state: RootState) => state.post.posts;
export const selectMyPosts = (state: RootState) => state.post.myposts;
export const selectUserPosts = (state: RootState) => state.post.userPosts;
export const selectSelectedPost = (state: RootState) => state.post.selectedPost;

export default postSlice.reducer;
