import React from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';

import './ModalLayout.scss';

import { RootState } from '../../../redux/store';
import { setCloseModal } from '../../../redux/slices/modal';
import { setRegisterClear } from '../../../redux/slices/register';

import { Close } from '../../chuncks';

type ModalProps = {
  title: string;
  children: any;
  isModal: string;
};

function ModalLayout({ title, children, isModal }: ModalProps) {
  const dispatch = useDispatch();
  const { isActive } = useSelector(({ modal }: RootState) => modal);

  const [isOpen, setIsOpen] = React.useState(false);

  const wrapperRef = React.useRef<HTMLDivElement | null>(null);

  const onCloseModal = () => {
    dispatch(setCloseModal());
  };

  const onOutsideClick = (e: any) => {
    if (wrapperRef.current?.contains(e.target)) onCloseModal();
  };

  React.useEffect(() => {
    isModal === isActive ? setIsOpen(true) : setIsOpen(false);

    if (!isActive) return;

    document.body.addEventListener('click', onOutsideClick);

    return () => {
      document.body.removeEventListener('click', onOutsideClick);
    };
  }, [isActive]);

  return (
    <div className={classNames('modal', isOpen && '_active')}>
      <div className="modal__body">
        <div className="modal__header modal-header">
          <strong className="modal-header__title">{title}</strong>
          <Close className="modal-header__close" onClick={onCloseModal}></Close>
        </div>
        <div className="modal__content modal-header">{children}</div>
      </div>
      <div className="modal__wrapper" ref={wrapperRef} />
    </div>
  );
}

export default ModalLayout;
