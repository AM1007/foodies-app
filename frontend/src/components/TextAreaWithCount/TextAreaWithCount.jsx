import { useEffect, useRef } from 'react';
import styles from './TextAreaWithCount.module.css';

const TextAreaWithCount = ({
  label,
  placeholder,
  maxLength,
  showMaxLength = true,
  value = '',
  error,
  register,
  name,
  className,
  wrapperClassName
}) => {
  const textareaRef = useRef(null);

  const adjustHeight = (element) => {
    if (!element) return;
    element.style.height = '0px'; 
    const newHeight = Math.max(element.scrollHeight, 36);
    element.style.height = `${newHeight}px`;
  };
  
  useEffect(() => {
    if (textareaRef.current) {
      adjustHeight(textareaRef.current);
    }
  }, [value]);

  const registerProps = register
    ? register(name, {
        onChange: (e) => {
          adjustHeight(e.target);
        },
      })
    : {};

  return (
    <div className={`${styles.formGroup} ${wrapperClassName || ''}`}>
      {label && <label className={styles.label}>{label}</label>}

      <div className={`${styles.inputWrapper} ${className || ''}`}>
        <textarea
          name={name}
          placeholder={placeholder}
          maxLength={maxLength}
          value={value}
          className={`${styles.textarea} ${error ? styles.errorInput : ''}`}
          {...registerProps}
          ref={(el) => {
            textareaRef.current = el;
            if (registerProps.ref) {
              registerProps.ref(el);
            }
          }}
        />
        <span className={styles.charCount}>
          <span className={value?.length ? styles.currentCount : styles.emptyCount}>
            {value?.length || 0}
          </span>
          {showMaxLength && <span className={styles.maxCount}>/{maxLength}</span>}
        </span>
      </div>

      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default TextAreaWithCount;
