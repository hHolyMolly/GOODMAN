import { configureStore } from '@reduxjs/toolkit';

import user from './slices/user';

import modal from './slices/modal';

import register from './slices/register';
import login from './slices/login';

import search from './slices/search';

export const store = configureStore({
  reducer: {
    user,
    modal,
    register,
    login,
    search,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
