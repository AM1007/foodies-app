import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

export default function Modal({ isOpen, onClose, children }) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }, [isOpen]);

  if (!isOpen) return null;

  //  createPortal to render modal outside the main app root.
  return ReactDOM.createPortal(
    <div className={styles.overlay} role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className={styles.backdrop} onClick={onClose} />

      {/* Modal Content */}
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        {/* Close Button with custom sprite icon */}
        <button
          type="button"
          className={styles.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          <svg className={styles.closeIcon}>
            <use xlinkHref="#close" />
          </svg>
        </button>

        {/* Children content */}
        <div className={styles.contentWrapper}>{children}</div>
      </div>
    </div>,
    document.body,
  );
}
