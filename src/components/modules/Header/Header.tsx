import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './Header.scss';

import { logo } from '../../../options';

import { RootState } from '../../../redux/store';

import { SearchField, UserBar } from './chuncks';

function Header() {
  const { isActive: searchActive } = useSelector(
    ({ search }: RootState) => search
  );

  const [screenWidth, setScreenWidth] = React.useState<any>(() => {
    return window.innerWidth;
  });

  const onResize = () => setScreenWidth(window.innerWidth);
  React.useEffect(() => window.addEventListener('resize', onResize), []);

  const mobileBreakpoint = searchActive && screenWidth < 479.98;
  const logoBreakpoint = searchActive && screenWidth < 1024.98;

  function LogoRow(): JSX.Element {
    return (
      <>
        {!logoBreakpoint && (
          <div className="header-logo__row">
            <strong className="header-logo__title">{logo.title}</strong>
            <span className="header-logo__text">{logo.text}</span>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <header className="header">
        <div className="header__container _container">
          <div className="header__body">
            {!mobileBreakpoint && (
              <Link className="header__logo header-logo" to="/">
                <div className="header-logo__icon">
                  <img
                    src={logo.imageUrl}
                    width={60}
                    height={60}
                    alt={logo.title}
                  />
                </div>
                {screenWidth > 549.98 && <LogoRow />}
              </Link>
            )}
            <SearchField className={classNames(searchActive && '_active')} />
            {!mobileBreakpoint && <UserBar />}
          </div>
        </div>
      </header>
      <div
        className={classNames('header__wrapper', searchActive && '_active')}
      />
    </>
  );
}

export default Header;
