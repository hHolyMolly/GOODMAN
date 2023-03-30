import React from 'react';
import classNames from 'classnames';

import './Close.scss';

type CloseProps = {
  className?: string;
  onClick?: any;
};

function Close({ className, onClick }: CloseProps) {
  return (
    <button
      className={classNames('close', className && `${className}`)}
      onClick={onClick}
      type="button"
    ></button>
  );
}

export default Close;
