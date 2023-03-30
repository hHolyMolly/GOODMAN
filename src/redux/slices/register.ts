import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RegisterSliceState {
  login: string;
  first_name: string;
  second_name: string;
  gender: Partial<boolean | string>;
  email: string;
  password: string;
  password_repeat: string;
  accept: boolean;
}

const initialState: RegisterSliceState = {
  login: '',
  first_name: '',
  second_name: '',
  gender: false,
  email: '',
  password: '',
  password_repeat: '',
  accept: false,
};

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<string>) => {
      state.login = action.payload;
    },
    setFirstName: (state, action: PayloadAction<string>) => {
      state.first_name = action.payload;
    },
    setSecondName: (state, action: PayloadAction<string>) => {
      state.second_name = action.payload;
    },
    setGender: (state, action: PayloadAction<boolean | string>) => {
      state.gender = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setPasswordRepeat: (state, action: PayloadAction<string>) => {
      state.password_repeat = action.payload;
    },
    setAccept: (state, action: PayloadAction<boolean>) => {
      state.accept = action.payload;
    },
    setRegisterClear: (state) => {
      state.login = '';
      state.first_name = '';
      state.second_name = '';
      state.gender = false;
      state.email = '';
      state.password = '';
      state.password_repeat = '';
      state.accept = false;
    },
  },
});

export const {
  setLogin,
  setFirstName,
  setSecondName,
  setGender,
  setEmail,
  setPassword,
  setPasswordRepeat,
  setAccept,
  setRegisterClear,
} = registerSlice.actions;

export default registerSlice.reducer;
