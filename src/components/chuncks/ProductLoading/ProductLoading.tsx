import React from 'react';
import ContentLoader from 'react-content-loader';

const ProductLoading: React.FC = () => (
  <div className="product-card">
    <ContentLoader
      speed={1}
      width="100%"
      height="100%"
      viewBox="0 0 210 380"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="10" y="0" rx="10" ry="10" width="190" height="200" />
      <rect x="0" y="210" rx="4" ry="4" width="210" height="35" />
      <rect x="0" y="255" rx="4" ry="4" width="170" height="18" />
      <rect x="0" y="293" rx="4" ry="4" width="60" height="18" />
      <rect x="75" y="293" rx="4" ry="4" width="60" height="18" />
      <rect x="-1" y="336" rx="10" ry="10" width="155" height="45" />
      <rect x="165" y="336" rx="10" ry="10" width="45" height="45" />
    </ContentLoader>
  </div>
);

export default ProductLoading;
