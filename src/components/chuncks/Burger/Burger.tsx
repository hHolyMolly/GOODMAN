import React from 'react';
import classNames from 'classnames';

import './Burger.scss';

type BurgerProps = {
  className?: string;
  onClick?: any;
};

function Burger({ className, onClick }: BurgerProps) {
  const onHandleBurger = () => {
    if (onClick) onClick();
  };

  return (
    <button
      className={classNames(className && `${className}`, '_burger')}
      onClick={onHandleBurger}
      type="button"
    >
      <div>
        <span></span>
      </div>
    </button>
  );
}

export default Burger;
