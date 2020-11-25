import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

// interface User {
//   id: number;
//   displayName: string;
//   avatar: string;
//   about: string;
// }

interface GetDmResponse {
  id: number;
  sender: number;
  receiver: number;
  message: string;
}

interface DM {
  targetUser: number;
  messages: [
    {
      id: number;
      sender: number;
      receiver: number;
      message: string;
    }
  ];
}

interface InitialState {
  dmInbox: DM[];
}

const apiUrl = 'http://localhost:3000/';

/* ============================
      自身へ送信されたDM全取得
============================ */
export const fetchGetDmInbox = createAsyncThunk(
  'dm/getDmInbox',
  async (userId: number) => {
    const res = await axios.get(`${apiUrl}dm/inbox`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('localJwtToken')}`,
      },
    });

    /* 
     以下でレスポンスを整形
      [{ id: 1, sender: 4, receiver: 7, message: 'aaa' }, ...]
        ↓　の形式に変換
      [ {targetUser: 4, messages: [{ id: 10, sender: 4, receiver: 7, message: 'aaa'}] }, ...] 
      → 配列の順番はメッセージを送ってきたユーザ順、
        messagesは最近のメッセージが配列のはじめにくるようにしている
    */
    const data: GetDmResponse[] = res.data;
    let dmInbox: Array<DM> = [];
    data
      .slice(0)
      .reverse()
      .map((dm) => {
        let dmItem: DM = {
          targetUser: 0,
          messages: [{ id: 0, sender: 0, receiver: 0, message: '' }],
        };
        if (dm.receiver === userId) {
          const found = dmInbox.find((item) => item.targetUser === dm.sender);
          if (found === undefined) {
            dmItem.targetUser = dm.sender;
            dmItem.messages[0].id = dm.id;
            dmItem.messages[0].sender = dm.sender;
            dmItem.messages[0].receiver = dm.receiver;
            dmItem.messages[0].message = dm.message;
            dmInbox.push(dmItem);
          } else {
            found?.messages.push(dm);
          }
        } else if (dm.sender === userId) {
          const found = dmInbox.find((item) => item.targetUser === dm.receiver);
          if (found === undefined) {
            dmItem.targetUser = dm.receiver;
            dmItem.messages[0].id = dm.id;
            dmItem.messages[0].sender = dm.sender;
            dmItem.messages[0].receiver = dm.receiver;
            dmItem.messages[0].message = dm.message;
            dmInbox.push(dmItem);
          } else {
            found?.messages.unshift(dm);
          }
        }
      });
    console.log(dmInbox);
    return dmInbox;
  }
);

/* ============================
        ここからSlice
============================ */
export const dmSlice = createSlice({
  name: 'dm',
  initialState: {
    dmInbox: [
      {
        targetUser: 0,
        messages: [
          {
            id: 0,
            sender: 0,
            receiver: 0,
            message: '',
          },
        ],
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
