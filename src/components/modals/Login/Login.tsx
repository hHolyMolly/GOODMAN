import React from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './Login.scss';

import $api from '../../../http/$api';

import { RootState } from '../../../redux/store';
import { setOpenModal, setCloseModal } from '../../../redux/slices/modal';
import {
  setLogin,
  setLoginClear,
  setPassword,
} from '../../../redux/slices/login';

import ModalLayout from '../../layouts/ModalLayout/ModalLayout';

import { Button, Error, Input } from '../../chuncks';
import { setUserProfile, setUserToken } from '../../../redux/slices/user';

type LoginProps = {
  isModal: string;
};

function Login({ isModal }: LoginProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isActive } = useSelector(({ modal }: RootState) => modal);
  const { login, password } = useSelector(({ login }: RootState) => login);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [errorLogin, setErrorLogin] = React.useState<boolean>(false);
  const [errorPassword, setErrorPassword] = React.useState<boolean>(false);
  const [errorAccount, setErrorAccount] = React.useState<boolean>(false);

  const login_req = login.length >= 1;
  const password_req = password.length >= 1;

  const validationLogin = () => {
    login_req ? setErrorLogin(false) : setErrorLogin(true);
  };

  const onChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setLogin(e.target.value));

    if (login_req) {
      setErrorPassword(false);
      setErrorAccount(false);
    }
  };

  const validationPassword = () => {
    password_req ? setErrorPassword(false) : setErrorPassword(true);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPassword(e.target.value));

    if (password_req) {
      setErrorPassword(false);
      setErrorAccount(false);
    }
  };

  async function getData() {
    setIsLoading(true);

    const loginValue = `login=${login}`;
    const passwordValue = `password=${password}`;

    const { data } = await $api.get(`/users/?${loginValue}&${passwordValue}`);

    const filterData = data.find(
      (user: any) =>
        login === user.user_info.login && password === user.user_info.password
    );

    if (filterData !== undefined) {
      localStorage.setItem('token', filterData.token);

      dispatch(setUserToken(filterData.token));
      dispatch(setUserProfile(filterData));
      dispatch(setCloseModal());

      setTimeout(() => setIsLoading(false), 300);
    } else {
      setErrorAccount(true);
      setIsLoading(false);
    }
  }

  const sendForm = (e: any) => {
    e.preventDefault();

    validationLogin();
    validationPassword();

    if (login_req && password_req && !errorAccount) getData();
  };

  React.useEffect(() => {
    setTimeout(() => {
      setErrorAccount(false);
      setErrorLogin(false);
      setErrorPassword(false);

      dispatch(setLoginClear());
    }, 300);
  }, [isActive]);

  return (
    <ModalLayout title="Вход" isModal={isModal}>
      <form className="form-login" onSubmit={sendForm} noValidate>
        <div className="form-login__column">
          <Input
            id="login-login"
            onChange={onChangeLogin}
            onBlur={validationLogin}
            parentError={errorLogin}
            value={login}
            name="login"
            placeholder="Логин"
            required
            prompt="default"
          >
            <svg
              viewBox="0 0 26 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 13.5C1 15.0759 1.31039 16.6363 1.91345 18.0922C2.5165 19.5481 3.40042 20.871 4.51472 21.9853C5.62902 23.0996 6.95189 23.9835 8.4078 24.5866C9.86371 25.1896 11.4241 25.5 13 25.5C14.5759 25.5 16.1363 25.1896 17.5922 24.5866C19.0481 23.9835 20.371 23.0996 21.4853 21.9853C22.5996 20.871 23.4835 19.5481 24.0866 18.0922C24.6896 16.6363 25 15.0759 25 13.5C25 11.9241 24.6896 10.3637 24.0866 8.9078C23.4835 7.45189 22.5996 6.12902 21.4853 5.01472C20.371 3.90042 19.0481 3.0165 17.5922 2.41345C16.1363 1.81039 14.5759 1.5 13 1.5C11.4241 1.5 9.86371 1.81039 8.4078 2.41345C6.95189 3.0165 5.62902 3.90042 4.51472 5.01472C3.40042 6.12902 2.5165 7.45189 1.91345 8.9078C1.31039 10.3637 1 11.9241 1 13.5Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 10.8334C9 11.8942 9.42143 12.9117 10.1716 13.6618C10.9217 14.4119 11.9391 14.8334 13 14.8334C14.0609 14.8334 15.0783 14.4119 15.8284 13.6618C16.5786 12.9117 17 11.8942 17 10.8334C17 9.77251 16.5786 8.75509 15.8284 8.00495C15.0783 7.2548 14.0609 6.83337 13 6.83337C11.9391 6.83337 10.9217 7.2548 10.1716 8.00495C9.42143 8.75509 9 9.77251 9 10.8334Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.22388 22.632C5.55389 21.5337 6.22917 20.5709 7.14954 19.8867C8.06991 19.2024 9.18634 18.833 10.3332 18.8334H15.6665C16.8149 18.833 17.9327 19.2032 18.8537 19.8891C19.7748 20.5749 20.4498 21.5397 20.7785 22.64"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Input>
          <Input
            id="login-password"
            onChange={onChangePassword}
            onBlur={validationPassword}
            parentError={errorPassword}
            value={password}
            name="password"
            type="password"
            placeholder="Пароль"
            required
            prompt="default"
          >
            <svg
              viewBox="0 0 21 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.33325 14.8333C1.33325 14.126 1.6142 13.4478 2.1143 12.9477C2.6144 12.4476 3.29267 12.1666 3.99992 12.1666H17.3333C18.0405 12.1666 18.7188 12.4476 19.2189 12.9477C19.719 13.4478 19.9999 14.126 19.9999 14.8333V22.8333C19.9999 23.5405 19.719 24.2188 19.2189 24.7189C18.7188 25.219 18.0405 25.5 17.3333 25.5H3.99992C3.29267 25.5 2.6144 25.219 2.1143 24.7189C1.6142 24.2188 1.33325 23.5405 1.33325 22.8333V14.8333Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 19C10 19.2652 10.1054 19.5196 10.2929 19.7071C10.4804 19.8946 10.7348 20 11 20C11.2652 20 11.5196 19.8946 11.7071 19.7071C11.8946 19.5196 12 19.2652 12 19C12 18.7348 11.8946 18.4804 11.7071 18.2929C11.5196 18.1054 11.2652 18 11 18C10.7348 18 10.4804 18.1054 10.2929 18.2929C10.1054 18.4804 10 18.7348 10 19Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.33325 12.1667V6.83333C5.33325 5.41885 5.89515 4.06229 6.89535 3.0621C7.89554 2.0619 9.2521 1.5 10.6666 1.5C12.0811 1.5 13.4376 2.0619 14.4378 3.0621C15.438 4.06229 15.9999 5.41885 15.9999 6.83333V12.1667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Input>
          {errorAccount && <Error>Неверный логин или пароль</Error>}
        </div>
        <div className="form-login__footer">
          <Button className={classNames(isLoading && '_loading')} type="submit">
            {!isLoading ? (
              'Войти'
            ) : (
              <div className="button-loading">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            )}
          </Button>
          <p className="form-login__register">
            Нет аккаунта?{' '}
            <button
              className="link"
              onClick={() => dispatch(setOpenModal('Register'))}
              type="button"
            >
              Регистрация
            </button>
          </p>
        </div>
      </form>
    </ModalLayout>
  );
}

export default Login;
