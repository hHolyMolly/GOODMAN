import classNames from 'classnames';
import React from 'react';

import './Error.scss';

type ErrorProps = {
  children: any;
  prompt?: Partial<string | boolean>;
  style?: any;
};

function Error({ children, prompt = false, style }: ErrorProps) {
  const mobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
      navigator.userAgent
    );

  const dropdownRef = React.useRef<HTMLDivElement | null>(null);

  const [isMobile] = React.useState<boolean>(() => {
    if (mobile) return true;
    return false;
  });
  const [isActive, setIsActive] = React.useState<boolean>(false);

  const handleDropdown = () => {
    if (isMobile) setIsActive(!isActive);
  };

  const onOutsideClick = (e: any) => {
    if (!dropdownRef.current?.contains(e.target)) setIsActive(false);
  };

  React.useEffect(() => {
    if (!isActive) return;

    document.body.addEventListener('click', onOutsideClick);

    return () => {
      document.body.removeEventListener('click', onOutsideClick);
    };
  }, [isActive]);

  return (
    <div className="error-block" style={style}>
      <p className="error-block__text">{children}</p>
      {prompt && (
        <>
          <div className="error-block__icon" ref={dropdownRef}>
            <svg
              onClick={handleDropdown}
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 10C1 11.1819 1.23279 12.3522 1.68508 13.4442C2.13738 14.5361 2.80031 15.5282 3.63604 16.364C4.47177 17.1997 5.46392 17.8626 6.55585 18.3149C7.64778 18.7672 8.8181 19 10 19C11.1819 19 12.3522 18.7672 13.4442 18.3149C14.5361 17.8626 15.5282 17.1997 16.364 16.364C17.1997 15.5282 17.8626 14.5361 18.3149 13.4442C18.7672 12.3522 19 11.1819 19 10C19 8.8181 18.7672 7.64778 18.3149 6.55585C17.8626 5.46392 17.1997 4.47177 16.364 3.63604C15.5282 2.80031 14.5361 2.13738 13.4442 1.68508C12.3522 1.23279 11.1819 1 10 1C8.8181 1 7.64778 1.23279 6.55585 1.68508C5.46392 2.13738 4.47177 2.80031 3.63604 3.63604C2.80031 4.47177 2.13738 5.46392 1.68508 6.55585C1.23279 7.64778 1 8.8181 1 10Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M10 7V11" strokeLinecap="round" strokeLinejoin="round" />
              <path
                d="M10 14V14.01"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div
              className={classNames(
                'error-block__dropdown',
                isActive && '_active'
              )}
            >
              {prompt}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Error;
