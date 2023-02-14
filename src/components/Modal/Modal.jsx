import { useEffect } from 'react';
import css from './modal.module.scss';

const Modal = ({ onCloseModal, activeImage }) => {
  const handleEscapeClose = e => {
    if (e.code === 'Escape') {
      onCloseModal();
    }
  };

  const handleBackdropClick = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      onCloseModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleEscapeClose);
    return () => {
      window.removeEventListener('keydown', handleEscapeClose);
    };
  }, []);

  return (
    <div onClick={handleBackdropClick} className={css.overlay}>
      <div className={css.modal}>
        <img src={activeImage} alt="" width="800" height="600" />
      </div>
    </div>
  );
};

export default Modal;
