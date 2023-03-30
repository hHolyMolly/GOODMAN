import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Register.scss';

import $api from '../../../http/$api';

import { RootState } from '../../../redux/store';
import {
  setAccept,
  setEmail,
  setFirstName,
  setGender,
  setLogin,
  setPassword,
  setPasswordRepeat,
  setRegisterClear,
  setSecondName,
} from '../../../redux/slices/register';
import { setUserToken, setUserProfile } from '../../../redux/slices/user';
import { setCloseModal, setOpenModal } from '../../../redux/slices/modal';

import ModalLayout from '../../layouts/ModalLayout/ModalLayout';

import { Button, Input, Radio, Checkbox, Error } from '../../chuncks';
import classNames from 'classnames';

type RegisterProps = {
  isModal: string;
};

function Register({ isModal }: RegisterProps) {
  const dispatch = useDispatch();
  const register = useSelector(({ register }: RootState) => register);
  const { isActive } = useSelector(({ modal }: RootState) => modal);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [errorLogin, setErrorLogin] = React.useState<boolean>(false);
  const [errorFirstName, setErrorFirstName] = React.useState<boolean>(false);
  const [errorSecondName, setErrorSecondName] = React.useState<boolean>(false);
  const [errorGender, setErrorGender] = React.useState<boolean>(false);
  const [errorEmail, setErrorEmail] = React.useState<boolean>(false);
  const [errorPassword, setErrorPassword] = React.useState<boolean>(false);
  const [errorPasswordRepeat, setErrorPasswordRepeat] =
    React.useState<boolean>(false);
  const [errorAccept, setErrorAccept] = React.useState<boolean>(false);

  const [errorAccount, setErrorAccount] = React.useState<boolean>(false);

  // Валидация поля "Логин"
  const login_req =
    register.login.length > 3 && register.login.match(/[a-zA-Z0-9]+/);

  // Валидация поля "Имя"
  const firstName_req =
    register.first_name.length > 0 &&
    !register.first_name.match(/[a-zA-Z0-9]+/);

  // Валидация поля "Фамилия"
  const secondName_req =
    register.second_name.length > 0 &&
    !register.second_name.match(/[a-zA-Z0-9]+/);

  // Валидация поля "radio button - Выбор пола"
  const gender_req = register.gender !== false;

  // Валидация поля "Электронная почта"
  const emailCode =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  const email_req = emailCode.test(register.email);

  // Валидация поля "Пароль"
  const beginWithoutDigit = /^\D.*$/;
  const withoutSpecialChars = /^[^-() /]*$/;
  const containsLetters = /^.*[a-zA-Z]+.*$/;
  const min8Chars = /^.{8,}$/;
  const max16Chars = /^.{0,16}$/;

  const eTarget = register.password;

  const password_req =
    beginWithoutDigit.test(eTarget) &&
    withoutSpecialChars.test(eTarget) &&
    containsLetters.test(eTarget) &&
    min8Chars.test(eTarget) &&
    max16Chars.test(eTarget);

  // Валидация поля "Повторить пароль"
  const passwordRepeat_req =
    register.password_repeat === register.password &&
    register.password_repeat.length > 0;

  // Валидация поля "checkbox - Я согласен на обработку..."
  const accept_req = register.accept !== false;

  const validationLogin = () => {
    login_req ? setErrorLogin(false) : setErrorLogin(true);
  };

  const onChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setLogin(e.target.value));

    if (login_req) setErrorLogin(false);
  };

  const validationFirstName = () => {
    firstName_req ? setErrorFirstName(false) : setErrorFirstName(true);
  };

  const validationSecondName = () => {
    secondName_req ? setErrorSecondName(false) : setErrorSecondName(true);
  };

  const onChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFirstName(e.target.value));

    if (firstName_req) setErrorSecondName(false);
  };

  const onChangeSecondName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSecondName(e.target.value));

    if (secondName_req) setErrorFirstName(false);
  };

  const validationGender = () => {
    gender_req ? setErrorGender(false) : setErrorGender(true);
  };

  const onChangeGender = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(setGender(e.target.value));
      setErrorGender(false);
    }
  };

  const validationEmail = () => {
    email_req ? setErrorEmail(false) : setErrorEmail(true);
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(e.target.value));

    if (email_req) setErrorEmail(false);
  };

  const validationPassword = () => {
    password_req ? setErrorPassword(false) : setErrorPassword(true);

    if (passwordRepeat_req) {
      setErrorPasswordRepeat(false);
    } else {
      setErrorPasswordRepeat(true);
    }
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPassword(e.target.value));

    if (password_req) setErrorPassword(false);

    if (register.password_repeat.length > 0) {
      if (passwordRepeat_req) {
        setErrorPasswordRepeat(false);
      } else {
        setErrorPasswordRepeat(true);
      }
    }
  };

  const validationPasswordRepeat = () => {
    if (passwordRepeat_req) {
      setErrorPasswordRepeat(false);
    } else {
      setErrorPasswordRepeat(true);
    }
  };

  const onChangePasswordRepeat = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPasswordRepeat(e.target.value));

    if (passwordRepeat_req) setErrorPasswordRepeat(false);
  };

  const validationAccept = () => {
    accept_req ? setErrorAccept(false) : setErrorAccept(true);
  };

  const onChangeAccept = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAccept(e.target.checked));

    e.target.checked ? setErrorAccept(false) : setErrorAccept(true);
  };

  const clearError = () => {
    setErrorLogin(false);
    setErrorFirstName(false);
    setErrorSecondName(false);
    setErrorGender(false);
    setErrorEmail(false);
    setErrorPassword(false);
    setErrorPasswordRepeat(false);
    setErrorAccept(false);
    setErrorAccount(false);
  };

  async function getData() {
    setIsLoading(true);

    await $api.get(`/users`).then((res) => {
      const findData = res.data.find(
        (user: any) =>
          user.user_info.login.toLowerCase() === register.login.toLowerCase()
      );

      if (findData === undefined) {
        setErrorAccount(false);

        const userData = {
          user_info: {
            login: register.login,
            first_name: register.first_name,
            second_name: register.second_name,
            gender: register.gender,
            email: register.email,
            password: register.password,
          },
        };

        $api.post('/users', userData).then((res) => {
          localStorage.setItem('token', res.data.token);

          dispatch(setUserToken(res.data.token));
          dispatch(setUserProfile(res.data));
          dispatch(setCloseModal());

          setTimeout(() => {
            setIsLoading(false);
          }, 300);
        });
      } else {
        setErrorAccount(true);
        setIsLoading(false);
      }
    });
  }

  const sendForm = (e: any) => {
    e.preventDefault();

    validationLogin();
    validationFirstName();
    validationSecondName();
    validationGender();
    validationEmail();
    validationPassword();
    validationPasswordRepeat();
    validationAccept();

    if (
      login_req &&
      firstName_req &&
      secondName_req &&
      gender_req &&
      email_req &&
      password_req &&
      passwordRepeat_req &&
      accept_req
    ) {
      getData();
    }
  };

  React.useEffect(() => {
    setTimeout(() => {
      clearError();

      dispatch(setRegisterClear());
    }, 300);
  }, [isActive]);

  React.useEffect(() => {
    if (register.password === register.password_repeat) {
      setErrorPasswordRepeat(false);
    }
  }, [register.password, register.password_repeat]);

  return (
    <ModalLayout title="Регистрация" isModal={isModal}>
      <form className="form-register" onSubmit={sendForm} noValidate>
        <div className="form-register__column">
          <Input
            id="register-login"
            onChange={onChangeLogin}
            onBlur={validationLogin}
            parentError={errorLogin}
            value={register.login}
            name="login"
            placeholder="Логин"
            required
            prompt="login"
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
          <div className="form-register__row">
            <Input
              id="register-username"
              onChange={onChangeFirstName}
              onBlur={validationFirstName}
              parentError={errorFirstName}
              value={register.first_name}
              name="username"
              placeholder="Имя"
              required
              prompt="name"
            />
            <Input
              id="register-surname"
              onChange={onChangeSecondName}
              onBlur={validationSecondName}
              parentError={errorSecondName}
              value={register.second_name}
              name="surname"
              placeholder="Фамилия"
              required
              prompt="name"
            />
          </div>
          <div className="form-register__block">
            <div className="form-register__row" style={{ padding: '5px 0px' }}>
              <Radio
                id="register-male"
                onChange={onChangeGender}
                name="gender"
                value="Мужчина"
              >
                Мужчина
              </Radio>
              <Radio
                id="register-female"
                onChange={onChangeGender}
                name="gender"
                value="Женщина"
              >
                Женщина
              </Radio>
            </div>
            {errorGender && (
              <Error style={{ marginTop: '10px' }}>Это поле обязательное</Error>
            )}
          </div>
          <Input
            id="register-email"
            onChange={onChangeEmail}
            onBlur={validationEmail}
            parentError={errorEmail}
            value={register.email}
            name="email"
            type="email"
            placeholder="Электронная почта"
            required
            prompt="email"
          >
            <svg
              viewBox="0 0 26 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 3.83329C1 3.12605 1.28095 2.44777 1.78105 1.94767C2.28115 1.44758 2.95942 1.16663 3.66667 1.16663H22.3333C23.0406 1.16663 23.7189 1.44758 24.219 1.94767C24.719 2.44777 25 3.12605 25 3.83329V17.1666C25 17.8739 24.719 18.5521 24.219 19.0522C23.7189 19.5523 23.0406 19.8333 22.3333 19.8333H3.66667C2.95942 19.8333 2.28115 19.5523 1.78105 19.0522C1.28095 18.5521 1 17.8739 1 17.1666V3.83329Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1 3.83325L13 11.8333L25 3.83325"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Input>
          <Input
            id="register-password"
            onChange={onChangePassword}
            onBlur={validationPassword}
            parentError={errorPassword}
            value={register.password}
            name="password"
            type="password"
            placeholder="Пароль"
            required
            prompt="password"
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
          <Input
            id="register-password-repeat"
            onChange={onChangePasswordRepeat}
            onBlur={validationPasswordRepeat}
            parentError={errorPasswordRepeat}
            value={register.password_repeat}
            name="password-repeat"
            type="password"
            placeholder="Повторить пароль"
            required
            prompt="password_repeat"
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
          <div className="form-register__block">
            <Checkbox
              id="register-accept"
              onChange={onChangeAccept}
              name="accept"
            >
              Я согласен на обработку персональных данных
            </Checkbox>
            {errorAccept && (
              <Error style={{ marginTop: '10px' }}>Это поле обязательное</Error>
            )}
            {errorAccount && (
              <Error style={{ marginTop: '10px' }}>
                Аккаунт с таким логином уже существует, пожалуйста используйте
                другой логин
              </Error>
            )}
          </div>
        </div>
        <div className="form-register__footer">
          <Button className={classNames(isLoading && '_loading')} type="submit">
            {!isLoading ? (
              'Зарегистрироваться'
            ) : (
              <div className="button-loading">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            )}
          </Button>
          <p className="form-register__login">
            Уже есть аккаунт?{' '}
            <button
              className="link"
              onClick={() => dispatch(setOpenModal('Login'))}
              type="button"
            >
              Войти
            </button>
          </p>
        </div>
      </form>
    </ModalLayout>
  );
}

export default Register;
