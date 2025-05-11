import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import icons from '../../icons/sprite.svg';

export default function Modal({
  isOpen,
  onClose,
  children,
  overlayClassName,
  modalClassName,
}) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className={`${styles.overlay} ${overlayClassName || ''}`}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.backdrop} onClick={onClose} />

      <div
        className={`${styles.modal} ${modalClassName || ''}`}
        onClick={e => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          <svg
            className={styles.closeIcon}
            width="24"
            height="24"
            aria-hidden="true"
          >
            <use href={`${icons}#icon-x`} />
          </svg>
        </button>

        <div className={styles.contentWrapper}>{children}</div>
      </div>
    </div>,
    document.body,
  );
}
