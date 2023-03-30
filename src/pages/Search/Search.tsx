import React, { ChangeEvent } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import './Search.scss';

import $api from '../../http/$api';

import { RootState } from '../../redux/store';
import { CardType } from '../../redux/slices/products';
import {
  setSearchValue,
  setAddSearchBrand,
  setRemoveSearchBrand,
  setSearchMinPrice,
  setSearchMaxPrice,
} from '../../redux/slices/search';

import {
  Checkbox,
  LoadingIcon,
  ProductCard,
  ProductLoading,
  Spoller,
} from '../../components/chuncks';

const brandsArr = [
  {
    title: 'Apple',
  },
  {
    title: 'Nokia',
  },
  {
    title: 'Samsung',
  },
  {
    title: 'Xiaomi',
  },
  {
    title: 'Huawei',
  },
];

function Search() {
  const dispatch = useDispatch();
  const { value, search_filters } = useSelector(
    ({ search }: RootState) => search
  );

  const minPriceProduct = 3599;
  const maxPriceProduct = 54999;

  const [loadingPage, setLoadingPage] = React.useState<boolean>(true);

  const [searchProducts, setSearchProducts] = React.useState<CardType[]>([]);
  const [searchLoading, setSearchLoading] = React.useState<boolean>(true);
  const [searchEmpty, setSearchEmpty] = React.useState<boolean>(false);

  const [searchBrand, setSearchBrand] = React.useState<string>('');

  const hash = window.location.hash;

  const onChangeBrand = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const thisBrand = {
        title: e.target.name,
      };

      if (e.target.checked === true) {
        dispatch(setAddSearchBrand(thisBrand));
      } else {
        dispatch(setRemoveSearchBrand(e.target.name));
      }
    },
    []
  );

  const onChangeSearchMin = (e: ChangeEvent<HTMLInputElement>) => {
    if (search_filters.price.max >= Number(e.target.value)) {
      dispatch(setSearchMinPrice(Number(e.target.value)));
    }
  };

  const onChangeSearchMax = (e: ChangeEvent<HTMLInputElement>) => {
    if (search_filters.price.min <= Number(e.target.value)) {
      dispatch(setSearchMaxPrice(Number(e.target.value)));
    }
  };

  const onChangeSearchBrand = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchBrand(e.target.value);
  };

  const loadSearchProducts = async () => {
    setSearchLoading(true);

    if (hash.includes('?q=')) {
      const hashValue = hash.split('?q=')[1];
      dispatch(setSearchValue(decodeURI(hashValue)));

      if (value === decodeURI(hashValue)) {
        $api.get(`/products/?title=${value}`).then((res) => {
          setSearchProducts(res.data);
          setLoadingPage(false);

          res.data.length > 0 ? setSearchEmpty(false) : setSearchEmpty(true);

          setSearchLoading(false);
        });
      }
    }
  };

  React.useEffect(() => {
    try {
      loadSearchProducts().then(() => {
        if (value === '') setSearchLoading(true);
      });
    } catch (error) {
      setSearchLoading(true);
    }

    window.scrollTo(0, 0);
  }, [value]);

  React.useEffect(() => {
    dispatch(setSearchMinPrice(minPriceProduct));
    dispatch(setSearchMaxPrice(maxPriceProduct));
  }, []);

  const brandsFilter = brandsArr.filter((brand) =>
    brand.title.toLowerCase().includes(searchBrand.toLowerCase())
  );

  const getBrand = search_filters.brands
    .reduce((sum, brand) => brand.title + '|' + sum, '')
    .slice(0, -1)
    .toLowerCase();

  const byBrand =
    getBrand !== ''
      ? searchProducts.filter((obj) =>
          getBrand.includes(obj.brand.toLowerCase())
        )
      : searchProducts;

  const getMinPrice = search_filters.price.min;
  const getMaxPrice = search_filters.price.max;

  const byPrice = byBrand.filter(
    (obj) => obj.price.actual >= getMinPrice && obj.price.actual <= getMaxPrice
  );

  return (
    <>
      <section className="search-page">
        <div className="_container">
          <div
            className={classNames('search-page__body', !searchEmpty && '_grid')}
          >
            {!searchEmpty ? (
              <>
                <aside className="search-page__sidebar search-page-sidebar">
                  {!loadingPage ? (
                    <div className="search-page-sidebar__items">
                      <Spoller title="Бренд">
                        <div className="search-page-sidebar__field">
                          <input
                            className="search-page-sidebar__input"
                            onChange={onChangeSearchBrand}
                            value={searchBrand}
                            type="text"
                            placeholder="Поиск..."
                          />
                        </div>
                        <div className="search-page-sidebar__columns">
                          {brandsFilter.length > 0 ? (
                            brandsFilter.map((brand, idx) => (
                              <Checkbox
                                onChange={onChangeBrand}
                                id={`brand_${brand.title}`}
                                name={brand.title}
                                key={`${brand.title}_${idx}`}
                              >
                                <span className="search-page-sidebar__checkbox-text">
                                  {brand.title}
                                </span>
                              </Checkbox>
                            ))
                          ) : (
                            <div className="search-page-sidebar__empty">
                              Ничего не найдено
                            </div>
                          )}
                        </div>
                      </Spoller>
                      <Spoller title="Цена">
                        <div className="search-page-sidebar__price">
                          <div className="search-page-sidebar__field">
                            <input
                              className="search-page-sidebar__input"
                              onChange={onChangeSearchMin}
                              value={getMinPrice}
                              type="text"
                              placeholder="От"
                            />
                          </div>
                          <div className="search-page-sidebar__field">
                            <input
                              className="search-page-sidebar__input"
                              onChange={onChangeSearchMax}
                              value={getMaxPrice}
                              type="text"
                              placeholder="До"
                            />
                          </div>
                        </div>
                        <div className="search-page-sidebar__range">
                          <input
                            className="search-page-sidebar__range-input"
                            onChange={onChangeSearchMin}
                            min={minPriceProduct}
                            max={maxPriceProduct}
                            value={getMinPrice}
                            type="range"
                          />
                          <input
                            className="search-page-sidebar__range-input"
                            onChange={onChangeSearchMax}
                            min={minPriceProduct}
                            max={maxPriceProduct}
                            value={getMaxPrice}
                            type="range"
                          />
                        </div>
                      </Spoller>
                    </div>
                  ) : (
                    <div className="search-page-sidebar__loading">
                      <LoadingIcon />
                    </div>
                  )}
                </aside>
                <div className="search-page__content search-page-content">
                  <div className="search-page-content__top search-page-top">
                    {!loadingPage ? (
                      <div className="search-page-top__item search-page-top__by">
                        Поиск по запросу: "{value}"
                      </div>
                    ) : (
                      <div className="search-page-top__item search-page-top__loading">
                        <LoadingIcon />
                      </div>
                    )}
                    <ul className="search-page-top__filters"></ul>
                  </div>
                  <div className="search-page-content__items">
                    {searchLoading
                      ? [...new Array(8)].map((_, idx) => (
                          <ProductLoading key={`product-loading_${idx}`} />
                        ))
                      : byPrice.map((obj, idx) => (
                          <ProductCard {...obj} key={`${obj.title}_${idx}`} />
                        ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="search-page__empty">
                По вашему запросу ничего не найдено. Уточните свой запрос
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Search;
