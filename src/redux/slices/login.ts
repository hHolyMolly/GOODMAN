import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LoginSliceState {
  login: string;
  password: string;
}

const initialState: LoginSliceState = {
  login: '',
  password: '',
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<string>) => {
      state.login = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setLoginClear: (state) => {
      state.login = '';
      state.password = '';
    },
  },
});

export const { setLogin, setPassword, setLoginClear } = loginSlice.actions;

export default loginSlice.reducer;
