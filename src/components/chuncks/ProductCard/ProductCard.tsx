import React from 'react';
import { Link } from 'react-router-dom';

import './ProductCard.scss';

import { CardType } from '../../../redux/slices/products';

import { Button } from '../';
import classNames from 'classnames';

function ProductCard({
  id,
  title,
  availability,
  images,
  price,
  color_value,
  colors,
  rating,
  reviews,
}: CardType) {
  const [imageActive, setImageActive] = React.useState<boolean>(false);

  const imageRef = React.useRef<HTMLAnchorElement | null>(null);

  const onEnterImage = () => images.length > 1 && setImageActive(true);
  const onLeaveImage = () => setImageActive(false);

  const toProduct = `/product/${id}-${color_value}`;

  return (
    <article className="product-card">
      {price.stock && (
        <div className="product-card__label product-card__label_stock">
          АКЦИЯ
        </div>
      )}
      <div className="product-card__row">
        <Link
          className="product-card__image"
          onMouseEnter={onEnterImage}
          onMouseLeave={onLeaveImage}
          to={toProduct}
          ref={imageRef}
        >
          {!imageActive ? (
            <img src={`./img/sections/products/${images[0].url}`} alt={title} />
          ) : (
            <img src={`./img/sections/products/${images[1].url}`} alt={title} />
          )}
        </Link>
      </div>
      <ul className="product-card__colors product-card-colors">
        {colors !== undefined &&
          colors.map((obj, idx) => (
            <li
              className="product-card-colors__item"
              key={`${obj.value}_${idx}`}
            >
              <Link
                className={`product-card-colors__link product-card-colors__link_${obj.value}`}
                to={`/product/${id}-${obj.value}`}
              ></Link>
            </li>
          ))}
      </ul>
      <Link className="product-card__title" to={toProduct}>
        {title}
      </Link>
      <div className="product-card__actions product-card-actions">
        <div className="product-card-actions__rating">
          <div
            className="product-card-actions__rating-active"
            style={{ width: `${rating * 20}` }}
          ></div>
        </div>
        <Link
          className="product-card-actions__reviews link"
          to={`${toProduct}#reviews`}
        >
          Отзывы ({reviews.length})
        </Link>
      </div>
      <div className="product-card__price product-card-price">
        {availability ? (
          <>
            <span
              className={classNames(
                'product-card-price__item',
                price.stock && '_stock'
              )}
            >
              {price.actual}₴
            </span>
            {price.stock && (
              <span className="product-card-price__item product-card-price__item_stock">
                {price.old}₴
              </span>
            )}
          </>
        ) : (
          <div className="product-card-price__availability">Нет в наличии</div>
        )}
      </div>
      <div className="product-card__footer product-card-footer">
        <Button className="product-card-footer__basket">
          Купить
          <svg
            width="20"
            height="22"
            viewBox="0 0 20 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 18.7779C1 19.3673 1.23413 19.9325 1.65088 20.3492C2.06762 20.766 2.63286 21.0001 3.22223 21.0001C3.8116 21.0001 4.37683 20.766 4.79358 20.3492C5.21033 19.9325 5.44445 19.3673 5.44445 18.7779C5.44445 18.1885 5.21033 17.6233 4.79358 17.2065C4.37683 16.7898 3.8116 16.5557 3.22223 16.5557C2.63286 16.5557 2.06762 16.7898 1.65088 17.2065C1.23413 17.6233 1 18.1885 1 18.7779Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.2222 18.7779C13.2222 19.3673 13.4563 19.9325 13.873 20.3492C14.2898 20.766 14.855 21.0001 15.4444 21.0001C16.0338 21.0001 16.599 20.766 17.0157 20.3492C17.4325 19.9325 17.6666 19.3673 17.6666 18.7779C17.6666 18.1885 17.4325 17.6233 17.0157 17.2065C16.599 16.7898 16.0338 16.5557 15.4444 16.5557C14.855 16.5557 14.2898 16.7898 13.873 17.2065C13.4563 17.6233 13.2222 18.1885 13.2222 18.7779Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.4445 16.5556H3.22223V1H1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.22217 3.22217L18.7778 4.33328L17.6666 12.1111H3.22217"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
        <button className="product-card-footer__favorite" type="button">
          <svg
            width="26"
            height="23"
            viewBox="0 0 26 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.4044 12.5942L13.0361 21.8726L3.66773 12.5942C3.0498 11.9929 2.56307 11.2701 2.23818 10.4715C1.9133 9.67283 1.75729 8.81556 1.78 7.95365C1.8027 7.09174 2.00362 6.24387 2.3701 5.46343C2.73658 4.68299 3.26069 3.98688 3.90942 3.41894C4.55814 2.851 5.31744 2.42354 6.13948 2.16346C6.96153 1.90339 7.82852 1.81634 8.68586 1.90779C9.54321 1.99925 10.3723 2.26723 11.121 2.69486C11.8697 3.1225 12.5217 3.70051 13.0361 4.39252C13.5526 3.70554 14.2054 3.13257 14.9536 2.70948C15.7017 2.28638 16.5292 2.02227 17.3841 1.93367C18.2391 1.84508 19.1031 1.9339 19.9221 2.19458C20.7411 2.45526 21.4976 2.88219 22.144 3.44865C22.7904 4.01511 23.313 4.7089 23.679 5.48661C24.045 6.26431 24.2465 7.10919 24.2709 7.96836C24.2954 8.82753 24.1422 9.68249 23.821 10.4797C23.4999 11.277 23.0176 11.9994 22.4044 12.6017"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
