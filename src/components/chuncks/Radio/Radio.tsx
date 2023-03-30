import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { RootState } from '../../../redux/store';

import './Radio.scss';

type RadioProps = {
  children: any;
  className?: string;
  onChange?: any;
  name: any;
  value: string;
  id?: string;
};

function Radio({ children, className, onChange, name, value, id }: RadioProps) {
  const { isActive } = useSelector(({ modal }: RootState) => modal);

  const radioRef = React.useRef<HTMLInputElement | null>(null);

  const onRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
  };

  React.useEffect(() => {
    setTimeout(() => {
      if (radioRef.current !== null) radioRef.current.checked = false;
    }, 300);
  }, [isActive]);

  return (
    <div className="radio-button">
      <input
        className={classNames(
          'radio-button__input',
          className && `${className}`
        )}
        onChange={onRadio}
        ref={radioRef}
        name={name}
        value={value}
        id={id}
        type="radio"
      />
      <label className="radio-button__label" htmlFor={id}>
        {children}
      </label>
    </div>
  );
}

export default Radio;
