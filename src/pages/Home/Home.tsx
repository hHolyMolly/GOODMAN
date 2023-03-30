import React from 'react';
import { useSelector } from 'react-redux';

import './Home.scss';

import $api from '../../http/$api';

import { RootState } from '../../redux/store';
import { CardType } from '../../redux/slices/products';

import { ProductCard, ProductLoading } from '../../components/chuncks';

function Home() {
  const [popularProducts, setPopularProducts] = React.useState<CardType[]>([]);
  const [popularLoading, setPopularLoading] = React.useState<boolean>(true);

  const limit = 'page=1&limit=5';

  const loadPopularProducts = async () => {
    setPopularLoading(true);
    const { data } = await $api.get(
      `/products/?sortBy=rating&order=desc&${limit}`
    );

    setPopularProducts(data);
    setPopularLoading(false);
  };

  React.useEffect(() => {
    try {
      loadPopularProducts();
    } catch (error) {}
  }, []);

  return (
    <div className="products-grid">
      <div className="_container">
        <div className="products-grid__body">
          {popularLoading
            ? [...new Array(5)].map((_, idx) => (
                <ProductLoading key={`product-loading_${idx}`} />
              ))
            : popularProducts.map((obj, idx) => (
                <ProductCard {...obj} key={`${obj.title}_${idx}`} />
              ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
