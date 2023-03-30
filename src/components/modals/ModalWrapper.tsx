import React from 'react';

import { Login, Register } from './';

function ModalWrapper() {
  return (
    <div className="modal-wrapper">
      <Register isModal="Register" />
      <Login isModal="Login" />
    </div>
  );
}

export default ModalWrapper;
