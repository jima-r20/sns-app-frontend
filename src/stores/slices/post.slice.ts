import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

const apiUrl = 'http://localhost:3000/';

export const postSlice = createSlice({
  name: 'post',
  initialState: {},
  reducers: {

  },
  extraReducers: (builder) => {

  }
})

export default postSlice.reducer;
