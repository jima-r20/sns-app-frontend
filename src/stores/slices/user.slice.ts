import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store'
import axios from 'axios';
import { PROPS_SIGNIN, PROPS_SIGNUP } from '../../types';

interface MyProfile {
  id: number;
  displayName: string;
  avatar: string;
  about: string;
}

// const apiUrl = process.env.REACT_APP_DEV_API_URL;
const apiUrl = 'http://localhost:3000/';

export const fetchSignUp = createAsyncThunk(
  'user/signUp',
  async (newUser: PROPS_SIGNUP) => {
    const res = await axios.post(`${apiUrl}user/signup`, newUser);
    console.log(res.data)
    return res.data;
  }
);

export const fetchSignIn = createAsyncThunk(
  'user/signIn',
  async (user: PROPS_SIGNIN) => {
    const res = await axios.post(`${apiUrl}user/signin`, user);
    console.log(res.data)
    return res.data;
  }
);

export const fetchGetUser = createAsyncThunk(
  'user/getUser',
  async () => {
    const res = await axios.get(`${apiUrl}user/myprofile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('localJwtToken')}`
      }
    });
    console.log(res.data);
    return res.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    myprofile: {
      id: 0,
      displayName: '',
      avatar: '',
      about: ''
    } as MyProfile
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchSignIn.fulfilled, (state, action) => {
      localStorage.setItem('localJwtToken', action.payload.accessToken)
    });
    builder.addCase(fetchGetUser.fulfilled, (state, action) => {
      state.myprofile = action.payload;
    });
  }
});

export const selectMyProfile = (state: RootState) => state.user.myprofile;

export default userSlice.reducer;