import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { RootState } from '../../../redux/store';

import './Checkbox.scss';

type CheckboxProps = {
  children: any;
  className?: string;
  onChange?: any;
  name: any;
  id?: string;
};

function Checkbox({ children, className, onChange, name, id }: CheckboxProps) {
  const { isActive } = useSelector(({ modal }: RootState) => modal);

  const checkboxRef = React.useRef<HTMLInputElement | null>(null);

  const onCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
  };

  React.useEffect(() => {
    setTimeout(() => {
      if (checkboxRef.current !== null) checkboxRef.current.checked = false;
    }, 300);
  }, [isActive]);

  return (
    <div className="checkbox-button">
      <input
        className={classNames(
          'checkbox-button__input',
          className && `${className}`
        )}
        onChange={onCheckbox}
        ref={checkboxRef}
        name={name}
        id={id}
        type="checkbox"
      />
      <label className="checkbox-button__label" htmlFor={id}>
        {children}
      </label>
    </div>
  );
}

export default Checkbox;
