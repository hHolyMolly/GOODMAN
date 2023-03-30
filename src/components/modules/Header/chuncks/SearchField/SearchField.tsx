import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import './SearchField.scss';

import $api from '../../../../../http/$api';

import { RootState } from '../../../../../redux/store';
import {
  setOpenSearch,
  setSearchValue,
} from '../../../../../redux/slices/search';
import { CardType } from '../../../../../redux/slices/products';

import { Close } from '../../../../chuncks';

type SearchFieldProps = {
  className?: string;
};

function SearchField({ className }: SearchFieldProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isActive } = useSelector(({ search }: RootState) => search);

  const [inputValue, setInputValue] = React.useState<string>('');
  const [isDropdown, setIsDropdown] = React.useState<boolean>(false);
  const [isDropdownEmpty, setIsDropdownEmpty] = React.useState<boolean>(false);
  const [dropdownProducts, setDropdownProducts] = React.useState<CardType[]>(
    []
  );

  const searchRef = React.useRef<HTMLFormElement | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const onCloseSearch = () => {
    dispatch(setOpenSearch(false));

    setIsDropdown(false);

    setTimeout(() => {
      setIsDropdownEmpty(false);
      setDropdownProducts([]);
    }, 300);
  };

  const debounceInput = React.useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length > 0) {
        $api({
          url: `products/?search=${e.target.value}&page=1&limit=3`,
          method: 'GET',
        }).then((res) => {
          if (res.data.length > 0) {
            setDropdownProducts(res.data);
            setIsDropdownEmpty(false);
          } else {
            setIsDropdownEmpty(true);
          }

          setIsDropdown(true);
        });
      } else {
        setIsDropdown(false);

        setTimeout(() => {
          setIsDropdownEmpty(false);
          setDropdownProducts([]);
        }, 300);
      }
    }, 800),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    debounceInput(e);
  };

  const onClearSearch = () => {
    inputRef.current?.focus();

    onCloseSearch();
    setInputValue('');
  };

  const sendForm = (e: any) => {
    e.preventDefault();

    if (inputValue.length > 0) {
      dispatch(setSearchValue(inputValue));
      navigate(`/search/?q=${inputValue}`);

      onCloseSearch();
      setInputValue('');
    }
  };

  const onOutsideClick = (e: any) => {
    if (
      !searchRef.current?.contains(e.target) &&
      !e.target.closest('.header-actions__item-search') &&
      !e.target.closest('.search-field__clear')
    ) {
      onCloseSearch();
      setInputValue('');
    }
  };
  React.useEffect(() => {
    if (!isActive) return;

    inputRef.current?.focus();
    document.body.addEventListener('click', onOutsideClick);

    return () => {
      document.body.removeEventListener('click', onOutsideClick);
    };
  }, [isActive]);

  return (
    <form
      className={classNames('search-field', className && `${className}`)}
      onSubmit={sendForm}
      autoComplete="off"
      ref={searchRef}
    >
      <div className="search-field__body">
        <div className="search-field__item">
          <input
            className="search-field__input"
            onChange={handleInputChange}
            name="q"
            value={inputValue}
            type="text"
            placeholder="Я ищу..."
            ref={inputRef}
          />
          {inputValue.length > 0 && (
            <Close className="search-field__clear" onClick={onClearSearch} />
          )}
          <div
            className={classNames(
              'search-field-dropdown',
              isDropdown && '_active'
            )}
          >
            {!isDropdownEmpty ? (
              <>
                <ul className="search-field-dropdown__items">
                  {dropdownProducts.map((obj, idx) => (
                    <li
                      className="search-field-card"
                      key={`${obj.title}_${idx}`}
                    >
                      <Link
                        className="search-field-card__link"
                        onClick={onCloseSearch}
                        to={`/product/${obj.id}`}
                      >
                        <div className="search-field-card__image">
                          <img
                            src={`./img/sections/products/${obj.images[0].url}`}
                            alt={obj.title}
                          />
                        </div>
                        <div className="search-field-card__row">
                          <h5 className="search-field-card__title">
                            {obj.title}
                          </h5>
                          <div className="search-field-card__actions">
                            <div className="search-field-card__rating">
                              <div
                                className="search-field-card__rating-active"
                                style={{ width: `${obj.rating * 20}%` }}
                              ></div>
                            </div>
                            <span className="search-field-card__reviews link">
                              Отзывы ({obj.reviews.length})
                            </span>
                          </div>
                          <div className="search-field-card__column">
                            {obj.availability === true ? (
                              <>
                                <span
                                  className={classNames(
                                    'search-field-card__price',
                                    obj.price.stock && '_stock'
                                  )}
                                >
                                  {obj.price.actual}₴
                                </span>
                                {obj.price.stock && (
                                  <span className="search-field-card__price_stock">
                                    {obj.price.old}₴
                                  </span>
                                )}
                              </>
                            ) : (
                              <div className="search-field-card__availability">
                                Нет в наличии
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
                <button
                  className="search-field-dropdown__all link"
                  onClick={onCloseSearch}
                  type="submit"
                >
                  Показать все результаты поиска →
                </button>
              </>
            ) : (
              <p className="search-field-dropdown__empty">
                По вашему запросу ничего не найдено. Уточните свой запрос
              </p>
            )}
          </div>
        </div>
        <button
          className="search-field__send search-field__button"
          type="submit"
        >
          <svg
            width="22"
            height="22"
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
        </button>
        <button
          className="search-field__close search-field__button"
          onClick={onCloseSearch}
        />
      </div>
    </form>
  );
}

export default SearchField;
