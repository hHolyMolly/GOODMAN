import classNames from 'classnames';
import React from 'react';

import './Spoller.scss';

type SpollerProps = {
  title: any;
  children: any;
  isOpen?: boolean;
};

function Spoller({ title, children, isOpen = true }: SpollerProps) {
  const [isActive, setIsActive] = React.useState<boolean>(isOpen);

  const handleActive = () => setIsActive(!isActive);

  return (
    <div className="spoller-item">
      <button className="spoller-item__button" onClick={handleActive}>
        <span className="spoller-item__button-text">{title}</span>
        <span
          className={classNames(
            'spoller-item__button-arrow',
            isActive && '_active'
          )}
        >
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 1L5 5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1 1L5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      <div
        className={classNames('spoller-item__content', isActive && '_active')}
      >
        {children}
      </div>
    </div>
  );
}

export default Spoller;
