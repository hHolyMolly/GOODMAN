import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import './Input.scss';

import { RootState } from '../../../redux/store';

import { Error } from '../../chuncks';

type InputProps = {
  children?: any;
  className?: string;
  onChange?: any;
  onBlur?: any;
  placeholder?: string;
  name: string;
  value?: string;
  type?: string;
  id?: string;
  parentError?: boolean;
  required?: boolean;
  prompt?: string;
};

function Input({
  children,
  className,
  onChange,
  onBlur,
  placeholder,
  name,
  value,
  type = 'text',
  id,
  parentError = false,
  required = false,
  prompt,
}: InputProps) {
  const { isActive } = useSelector(({ modal }: RootState) => modal);

  const [focus, setFocus] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);

  const [dropdownError, setDropdownError] = React.useState<string>('');

  const [inputValue, setInputValue] = React.useState<number>(0);

  const [minChars, setMinChars] = React.useState<boolean>(false);

  const focusInput = () => {
    setFocus(true);
    setError(false);
  };

  const blurInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFocus(false);

    if (required) {
      e.target.value.length >= 2 ? setError(false) : setError(true);

      if (onChange) onChange(e);
    }

    if (onBlur) {
      onBlur();
    }
  };

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/\s+/gi, '');

    setInputValue(e.target.value.length);

    if (required && !parentError && e.target.value.length >= 2) {
      setError(false);
    }

    if (onChange) onChange(e);
  };

  React.useEffect(() => {
    if (!focus) {
      if (required && parentError) {
        setError(true);
      }
    }
  }, [value, error, focus]);

  React.useEffect(() => {
    setTimeout(() => {
      setError(false);
    }, 300);
  }, [isActive]);

  React.useEffect(() => {
    if (parentError) {
      setError(true);
    } else {
      setError(false);
    }
  }, [parentError]);

  React.useEffect(() => {
    inputValue > 0 ? setMinChars(false) : setMinChars(true);
  }, [inputValue]);

  React.useEffect(() => {
    prompt === 'login' &&
      setDropdownError(
        'Поле может содержать только латинские символы и состоять минимум из 4 символов'
      );
    prompt === 'name' &&
      setDropdownError('Поле не может содержать латинские символы и цифры');
    prompt === 'email' &&
      setDropdownError(
        'Поле может содержать только латинские символы и должно иметь знак @'
      );
    prompt === 'password' &&
      setDropdownError(
        'Поле может содержать только латинский символы, минимальное количество символов 8, а максимальное 16'
      );
    prompt === 'password_repeat' && setDropdownError('');
    prompt === 'default' && setDropdownError('');
  }, []);

  return (
    <div className={classNames('field-block', className && `${className}`)}>
      <div
        className={classNames(
          'field-block__row',
          focus && '_focus',
          error && '_error'
        )}
      >
        <input
          className="field-block__input"
          onFocus={focusInput}
          onBlur={blurInput}
          onChange={onInput}
          id={id}
          name={name}
          value={value}
          type={type}
          placeholder={placeholder}
          autoComplete="off"
        />
        {children && (
          <label className="field-block__icon" htmlFor={id}>
            {children}
          </label>
        )}
      </div>
      {error && (
        <Error prompt={dropdownError}>
          {minChars ? (
            'Это поле обязательное'
          ) : (
            <>
              {prompt === 'password_repeat'
                ? 'Пароли не совпадают'
                : prompt === 'default'
                ? 'Это поле обязательное'
                : 'Некорректные данные'}
            </>
          )}
        </Error>
      )}
    </div>
  );
}

export default Input;
