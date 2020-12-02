import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios from 'axios';
import {
  PROPS_SIGNIN,
  PROPS_SIGNUP,
  PROPS_UPDATE_USER,
} from '../../interfaces/slice-props.interface';

interface Profile {
  id: number;
  displayName: string;
  avatar: string;
  about: string;
}

interface InitialState {
  myprofile: Profile;
  users: Profile[];
  selectedUser: Profile;
}

// const apiUrl = process.env.REACT_APP_DEV_API_URL;
const apiUrl = 'http://localhost:3000/';

export const fetchSignUp = createAsyncThunk(
  'user/signUp',
  async (newUser: PROPS_SIGNUP) => {
    const res = await axios.post(`${apiUrl}user/signup`, newUser);
    return res.data;
  }
);

export const fetchSignIn = createAsyncThunk(
  'user/signIn',
  async (user: PROPS_SIGNIN) => {
    const res = await axios.post(`${apiUrl}user/signin`, user);
    return res.data;
  }
);

export const fetchGetUsers = createAsyncThunk('user/getUsers', async () => {
  const res = await axios.get(`${apiUrl}user/profiles`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('localJwtToken')}`,
    },
  });
  return res.data;
});

export const fetchGetUser = createAsyncThunk('user/getUser', async () => {
  const res = await axios.get(`${apiUrl}user/myprofile`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('localJwtToken')}`,
    },
  });
  return res.data;
});

export const fetchUpdateUser = createAsyncThunk(
  'user/updateUser',
  async (updateUser: PROPS_UPDATE_USER) => {
    const { id, displayName, avatar, about } = updateUser;
    const res = await axios.patch(
      `${apiUrl}user/profiles/${id}`,
      { displayName, avatar, about },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('localJwtToken')}`,
        },
      }
    );
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
      about: '',
    },
    users: [
      {
        id: 0,
        displayName: '',
        avatar: '',
        about: '',
      },
    ],
    selectedUser: {
      id: 0,
      displayName: '',
      avatar: '',
      about: '',
    },
  } as InitialState,
  reducers: {
    setSelectedUser(state, action) {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSignIn.fulfilled, (state, action) => {
      localStorage.setItem('localJwtToken', action.payload.accessToken);
    });
    builder.addCase(fetchGetUsers.fulfilled, (state, action) => {
      return { ...state, users: action.payload };
    });
    builder.addCase(fetchGetUser.fulfilled, (state, action) => {
      return { ...state, myprofile: action.payload };
    });
    builder.addCase(fetchUpdateUser.fulfilled, (state, action) => {
      return {
        ...state,
        myprofile: action.payload,
        users: [...state.users, action.payload],
      };
    });
  },
});

export const { setSelectedUser } = userSlice.actions;

export const selectMyProfile = (state: RootState) => state.user.myprofile;
export const selectUsers = (state: RootState) => state.user.users;
export const selectSelectedUser = (state: RootState) => state.user.selectedUser;

export default userSlice.reducer;
