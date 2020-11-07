import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store'
import axios from 'axios';
import { PROPS_SIGNUP } from '../../types';

interface AuthState {
  // myprofile: {
  //   id: number;
  //   email: string;
  //   avatar: string;
  //   about: string;
  // }
}

// const apiUrl = process.env.REACT_APP_DEV_API_URL;
const apiUrl = 'http://localhost:3000/';

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (authen: PROPS_SIGNUP) => {
    const res = await axios.post(`${apiUrl}user/signup`, authen);
    console.log(res.data)
    return res.data;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {},
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state, action) => {
      
    });
  }
});

export default authSlice.reducer;