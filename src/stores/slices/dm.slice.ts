import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Axios from 'axios';
import { RootState } from '../store';

// interface User {
//   id: number;
//   displayName: string;
//   avatar: string;
//   about: string;
// }

interface DmInbox {
  id: number;
  sender: number;
  message: string;
}

interface InitialState {
  dmInbox: DmInbox[];
}

const apiUrl = 'http://localhost:3000/';

/* ============================
      自身へ送信されたDM全取得
============================ */
export const fetchGetDmInbox = createAsyncThunk('dm/getDmInbox', async () => {
  const res = await Axios.get(`${apiUrl}dm/inbox`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('localJwtToken')}`,
    },
  });
  return res.data;
});

export const dmSlice = createSlice({
  name: 'dm',
  initialState: {
    dmInbox: [
      {
        id: 0,
        sender: 0,
        message: '',
      },
    ],
  } as InitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGetDmInbox.fulfilled, (state, action) => {
      return { ...state, dm: action.payload };
    });
  },
});

export const selectDm = (state: RootState) => state.dm.dmInbox;

export default dmSlice.reducer;
