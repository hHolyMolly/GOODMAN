import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserInfo = {
  login: string;
  first_name: string;
  second_name: string;
  gender: string;
  email: string;
  password: string;
};

type UserItems = {
  user_info: UserInfo;
};

interface UserSliceState {
  token: Partial<string | boolean>;
  user: UserItems;
  isLoggedIn: boolean;
}

const initialState: UserSliceState = {
  token: '',
  user: {
    user_info: {
      login: '',
      first_name: '',
      second_name: '',
      gender: '',
      email: '',
      password: '',
    },
  },
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserToken: (state, action: PayloadAction<string | boolean>) => {
      state.token = action.payload;

      if (state.token !== '') {
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
      }
    },
    setUserProfile: (state, action: PayloadAction<UserItems>) => {
      state.user = action.payload;

      if (state.token !== '') {
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
      }
    },
    setUserLogout: (state) => {
      state.token = '';
      state.isLoggedIn = false;

      localStorage.setItem('token', '');
    },
  },
});

export const { setUserToken, setUserProfile, setUserLogout } =
  userSlice.actions;

export default userSlice.reducer;
