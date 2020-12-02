import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { PROPS_CREATE_DM } from '../../interfaces/slice-props.interface';
import { RootState } from '../store';

interface DMFormat {
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
  selectedDM: DM;
}

const apiUrl = process.env.REACT_APP_DEV_API_URL;

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

    const dmInbox = formatDM(res.data, userId);
    return dmInbox;
  }
);

/* ============================
            DM作成
============================ */
export const fetchCreateDm = createAsyncThunk(
  'post/createDm',
  async (data: PROPS_CREATE_DM) => {
    const res = await axios.post(`${apiUrl}dm/message`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('localJwtToken')}`,
      },
    });
    console.log(res.data);
    // return res.data;
  }
);

/* 
  以下でレスポンスを整形
  [{ id: 1, sender: 4, receiver: 7, message: 'aaa' }, ...]
    ↓　の形式に変換
  [ {targetUser: 4, messages: [{ id: 10, sender: 4, receiver: 7, message: 'aaa'}] }, ...] 
  → 配列の順番はメッセージを送ってきたユーザ順、
    messagesは最近のメッセージが配列のはじめにくるようにしている
*/
const formatDM = (data: DMFormat[], userId: number) => {
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
          found?.messages.push(dm);
        }
      }
    });
  return dmInbox;
};

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
    selectedDM: {
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
  } as InitialState,
  reducers: {
    setSelectedDM(state, action) {
      state.selectedDM = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetDmInbox.fulfilled, (state, action) => {
      return { ...state, dmInbox: action.payload };
    });
  },
});

export const { setSelectedDM } = dmSlice.actions;

export const selectDmInbox = (state: RootState) => state.dm.dmInbox;
export const selectSelectedDM = (state: RootState) => state.dm.selectedDM;

export default dmSlice.reducer;
