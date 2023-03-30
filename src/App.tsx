import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import $api from './http/$api';

import { RootState } from './redux/store';
import {
  setUserToken,
  setUserProfile,
  setUserLogout,
} from './redux/slices/user';

import MainLayout from './components/layouts/MainLayout';

import { Home, Search } from './pages';
import { NotFound } from './components/sections';

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(({ user }: RootState) => user);

  const getToken = localStorage.getItem('token') || '';

  React.useState<any>(() => {
    if (getToken !== '') return dispatch(setUserToken(`${getToken}`));
    return dispatch(setUserToken(`${getToken}`));
  });

  const logout = () => dispatch(setUserLogout());

  async function loadUsers() {
    try {
      if (isLoggedIn) {
        const { data } = await $api.get(`/users/?token=${getToken}`);

        if (data[0] !== undefined) {
          dispatch(setUserProfile(data[0]));
        } else {
          logout();
        }
      }
    } catch (error) {
      logout();
    }
  }

  React.useEffect(() => {
    loadUsers();
  }, [isLoggedIn]);

  React.useEffect(() => window.scrollTo(0, 0), []);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />

        <Route path="/search/" element={<Search />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
