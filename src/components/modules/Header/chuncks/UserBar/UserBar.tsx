import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import './UserBar.scss';

import { RootState } from '../../../../../redux/store';
import { setOpenModal } from '../../../../../redux/slices/modal';
import { setUserLogout } from '../../../../../redux/slices/user';
import { setOpenSearch } from '../../../../../redux/slices/search';

import { phone } from '../../../../../options';

import { Button, Burger } from '../../../../chuncks';

function UserBar() {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector(({ user }: RootState) => user);
  const { isActive: searchActive } = useSelector(
    ({ search }: RootState) => search
  );

  const userRef = React.useRef<HTMLDivElement | null>(null);

  const [userDropdown, setUserDropdown] = React.useState<boolean>(false);
  const [screenWidth, setScreenWidth] = React.useState<any>(() => {
    return window.innerWidth;
  });

  const onLoginModal = () => dispatch(setOpenModal('Login'));
  const onRegisterModal = () => dispatch(setOpenModal('Register'));

  const onLogoutProfile = () => {
    dispatch(setUserLogout());
    onCloseUserDropdown();
  };

  const onOpenedSearch = () => {
    dispatch(setOpenSearch(true));
  };

  const onHandleMobileMenu = () => {};

  const onHandleUserDropdown = () => setUserDropdown(!userDropdown);
  const onCloseUserDropdown = () => setUserDropdown(false);

  const onOutsideUserDropdown = (e: any) => {
    if (!userRef.current?.contains(e.target)) onCloseUserDropdown();
  };
  React.useEffect(() => {
    if (!userDropdown) return;

    document.body.addEventListener('click', onOutsideUserDropdown);

    return () => {
      document.body.removeEventListener('click', onOutsideUserDropdown);
    };
  }, [userDropdown]);

  const onResize = () => setScreenWidth(window.innerWidth);
  React.useEffect(() => window.addEventListener('resize', onResize), []);

  const basketBreakpoint = !searchActive && screenWidth > 1023.98;

  return (
    <div className="header-actions">
      {screenWidth > 1199.98 && !searchActive && (
        <a
          className="header-actions__phone header-actions__item"
          href={`tel:${phone.value}`}
        >
          <i className="header-actions__item-icon">
            <svg
              width="20"
              height="20"
              viewBox="0 0 22 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.35294 1.5H8.05882L10.4118 7.38235L7.47059 9.14706C8.73054 11.7018 10.7982 13.7695 13.3529 15.0294L15.1176 12.0882L21 14.4412V19.1471C21 19.7711 20.7521 20.3696 20.3108 20.8108C19.8696 21.2521 19.2711 21.5 18.6471 21.5C14.058 21.2211 9.72959 19.2724 6.47862 16.0214C3.22765 12.7704 1.27888 8.44204 1 3.85294C1 3.2289 1.2479 2.63042 1.68916 2.18916C2.13042 1.7479 2.7289 1.5 3.35294 1.5Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </i>
          <span className="header-actions__item-text">{phone.title}</span>
        </a>
      )}
      {!searchActive && (
        <button
          className="header-actions__item header-actions__item-search"
          onClick={onOpenedSearch}
        >
          <i className="header-actions__item-icon">
            <svg
              width="20"
              height="20"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 8.77778C1 9.79917 1.20118 10.8106 1.59205 11.7542C1.98292 12.6978 2.55582 13.5553 3.27806 14.2775C4.00029 14.9997 4.85771 15.5726 5.80135 15.9635C6.74499 16.3544 7.75639 16.5556 8.77778 16.5556C9.79917 16.5556 10.8106 16.3544 11.7542 15.9635C12.6978 15.5726 13.5553 14.9997 14.2775 14.2775C14.9997 13.5553 15.5726 12.6978 15.9635 11.7542C16.3544 10.8106 16.5556 9.79917 16.5556 8.77778C16.5556 7.75639 16.3544 6.74499 15.9635 5.80135C15.5726 4.85771 14.9997 4.00029 14.2775 3.27806C13.5553 2.55582 12.6978 1.98292 11.7542 1.59205C10.8106 1.20118 9.79917 1 8.77778 1C7.75639 1 6.74499 1.20118 5.80135 1.59205C4.85771 1.98292 4.00029 2.55582 3.27806 3.27806C2.55582 4.00029 1.98292 4.85771 1.59205 5.80135C1.20118 6.74499 1 7.75639 1 8.77778Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 20.9999L14.3334 14.3333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </i>
          {screenWidth > 1023.98 && (
            <span className="header-actions__item-text">Поиск</span>
          )}
        </button>
      )}
      {isLoggedIn ? (
        <>
          {basketBreakpoint ? (
            <div className="header-actions__basket header-basket header-actions__item">
              <Button className="header-basket__button">
                <span className="header-basket__value">4200 ₴</span>
                <div className="header-basket__row">
                  <i className="header-basket__icon header-actions__item-icon">
                    <svg
                      width="20"
                      height="22"
                      viewBox="0 0 20 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 18.7779C1 19.3673 1.23413 19.9325 1.65088 20.3492C2.06762 20.766 2.63286 21.0001 3.22223 21.0001C3.8116 21.0001 4.37683 20.766 4.79358 20.3492C5.21033 19.9325 5.44445 19.3673 5.44445 18.7779C5.44445 18.1885 5.21033 17.6233 4.79358 17.2065C4.37683 16.7898 3.8116 16.5557 3.22223 16.5557C2.63286 16.5557 2.06762 16.7898 1.65088 17.2065C1.23413 17.6233 1 18.1885 1 18.7779Z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.2222 18.7779C13.2222 19.3673 13.4563 19.9325 13.873 20.3492C14.2898 20.766 14.855 21.0001 15.4444 21.0001C16.0338 21.0001 16.599 20.766 17.0157 20.3492C17.4325 19.9325 17.6666 19.3673 17.6666 18.7779C17.6666 18.1885 17.4325 17.6233 17.0157 17.2065C16.599 16.7898 16.0338 16.5557 15.4444 16.5557C14.855 16.5557 14.2898 16.7898 13.873 17.2065C13.4563 17.6233 13.2222 18.1885 13.2222 18.7779Z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15.4445 16.5556H3.22223V1H1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3.22217 3.22217L18.7778 4.33328L17.6666 12.1111H3.22217"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </i>
                  <span className="header-basket__count">3</span>
                </div>
              </Button>
            </div>
          ) : (
            !searchActive && (
              <button className="header-actions__item">
                <i className="header-basket__icon header-actions__item-icon">
                  <svg
                    width="20"
                    height="22"
                    viewBox="0 0 20 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 18.7779C1 19.3673 1.23413 19.9325 1.65088 20.3492C2.06762 20.766 2.63286 21.0001 3.22223 21.0001C3.8116 21.0001 4.37683 20.766 4.79358 20.3492C5.21033 19.9325 5.44445 19.3673 5.44445 18.7779C5.44445 18.1885 5.21033 17.6233 4.79358 17.2065C4.37683 16.7898 3.8116 16.5557 3.22223 16.5557C2.63286 16.5557 2.06762 16.7898 1.65088 17.2065C1.23413 17.6233 1 18.1885 1 18.7779Z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13.2222 18.7779C13.2222 19.3673 13.4563 19.9325 13.873 20.3492C14.2898 20.766 14.855 21.0001 15.4444 21.0001C16.0338 21.0001 16.599 20.766 17.0157 20.3492C17.4325 19.9325 17.6666 19.3673 17.6666 18.7779C17.6666 18.1885 17.4325 17.6233 17.0157 17.2065C16.599 16.7898 16.0338 16.5557 15.4444 16.5557C14.855 16.5557 14.2898 16.7898 13.873 17.2065C13.4563 17.6233 13.2222 18.1885 13.2222 18.7779Z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.4445 16.5556H3.22223V1H1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.22217 3.22217L18.7778 4.33328L17.6666 12.1111H3.22217"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="header-actions__value">0</span>
                </i>
              </button>
            )
          )}
          {!searchActive && screenWidth > 424.98 && (
            <button className="header-actions__item">
              <i className="header-actions__item-icon">
                <svg
                  width="26"
                  height="23"
                  viewBox="0 0 26 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.4044 12.5942L13.0361 21.8726L3.66773 12.5942C3.0498 11.9929 2.56307 11.2701 2.23818 10.4715C1.9133 9.67283 1.75729 8.81556 1.78 7.95365C1.8027 7.09174 2.00362 6.24387 2.3701 5.46343C2.73658 4.68299 3.26069 3.98688 3.90942 3.41894C4.55814 2.851 5.31744 2.42354 6.13948 2.16346C6.96153 1.90339 7.82852 1.81634 8.68586 1.90779C9.54321 1.99925 10.3723 2.26723 11.121 2.69486C11.8697 3.1225 12.5217 3.70051 13.0361 4.39252C13.5526 3.70554 14.2054 3.13257 14.9536 2.70948C15.7017 2.28638 16.5292 2.02227 17.3841 1.93367C18.2391 1.84508 19.1031 1.9339 19.9221 2.19458C20.7411 2.45526 21.4976 2.88219 22.144 3.44865C22.7904 4.01511 23.313 4.7089 23.679 5.48661C24.045 6.26431 24.2465 7.10919 24.2709 7.96836C24.2954 8.82753 24.1422 9.68249 23.821 10.4797C23.4999 11.277 23.0176 11.9994 22.4044 12.6017"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="header-actions__value">0</span>
              </i>
            </button>
          )}
          {screenWidth > 1023.98 && (
            <div
              className="header-actions__user header-user header-actions__item"
              ref={userRef}
            >
              <button
                className={classNames(
                  'header-user__button',
                  userDropdown && '_active'
                )}
                onClick={onHandleUserDropdown}
              >
                <i className="header-user__icon">
                  <svg
                    width="26"
                    height="27"
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
                </i>
                <span className="header-user__text">
                  {user.user_info.first_name === ''
                    ? 'Загрузка...'
                    : user.user_info.first_name}
                </span>
                <i className="header-user__arrow">
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 1L5 5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1 1L5 5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </i>
              </button>
              <div
                className={classNames(
                  'header-user__dropdown',
                  userDropdown && '_active'
                )}
              >
                <ul className="header-user__list">
                  <li className="header-user__list-item">
                    <Link
                      className="header-user__list-link"
                      onClick={onCloseUserDropdown}
                      to={`/profile/information`}
                    >
                      Личный кабинет
                    </Link>
                  </li>
                </ul>
                <button
                  className="header-user__exit header-user__list-link"
                  onClick={onLogoutProfile}
                  type="button"
                >
                  Выход
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        screenWidth > 1023.98 && (
          <div className="header-actions__authorization header-authorization">
            <button
              className="header-authorization__login"
              onClick={onLoginModal}
              type="button"
            >
              Вход
            </button>
            <Button
              className="header-authorization__register"
              onClick={onRegisterModal}
              color="yellow"
            >
              Регистрация
            </Button>
          </div>
        )
      )}
      {screenWidth < 1023.98 && (
        <Burger
          className="header__burger header-actions__item"
          onClick={onHandleMobileMenu}
        />
      )}
    </div>
  );
}

export default UserBar;
