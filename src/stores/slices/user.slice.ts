import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store'
import axios from 'axios';
import { PROPS_SIGNIN, PROPS_SIGNUP } from '../../types';

interface AuthState {
  // myprofile: {
  //   id: number;
  //   displayName: string;
  //   avatar: string;
  //   about: string;
  // }
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

export const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchSignIn.fulfilled, (state, action) => {
      localStorage.setItem('localJwtToken', action.payload.accessToken)
    })
  }
});

export default userSlice.reducer;