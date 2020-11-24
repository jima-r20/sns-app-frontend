import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
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
  receiver: number;
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
  const res = await axios.get(`${apiUrl}dm/inbox`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('localJwtToken')}`,
    },
  });
  console.log(res.data);
  return res.data;
});

export const dmSlice = createSlice({
  name: 'dm',
  initialState: {
    dmInbox: [
      {
        id: 0,
        sender: 0,
        receiver: 0,
        message: '',
      },
    ],
  } as InitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGetDmInbox.fulfilled, (state, action) => {
      return { ...state, dmInbox: action.payload };
    });
  },
});

export const selectDmInbox = (state: RootState) => state.dm.dmInbox;

export default dmSlice.reducer;
