import React from 'react';
import classNames from 'classnames';

import './Button.scss';

type ButtonProps = {
  children: any;
  color?: string;
  className?: string;
  style?: any;
  onClick?: any;
  type?: any;
};

function Button({
  children,
  color = 'yellow',
  className,
  style,
  onClick,
  type = 'button',
}: ButtonProps) {
  return (
    <button
      className={classNames(
        'button',
        color && `_${color}`,
        className && `${className}`
      )}
      style={style}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
