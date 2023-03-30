import React from 'react';
import { Outlet } from 'react-router-dom';

import { Header, Footer } from '../modules';
import ModalWrapper from '../modals/ModalWrapper';

function MainLayout() {
  return (
    <div className="wrapper">
      <Header />
      <main className="page">
        <Outlet />
      </main>
      <Footer />
      <ModalWrapper />
    </div>
  );
}

export default MainLayout;
