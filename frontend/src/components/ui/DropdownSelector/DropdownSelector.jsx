import { useState, useEffect, useRef } from 'react';
import styles from './DropdownSelector.module.css';
import icons from '../../../icons/sprite.svg';

const DropdownSelector = ({
  label,
  options,
  value,
  onChange,
  placeholder = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaceholderActive, setIsPlaceholderActive] = useState(true); 
  const dropdownRef = useRef(null); 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleSelect = (val) => {
    onChange(val);
    setIsOpen(false);
    setIsPlaceholderActive(false); 
  };

  const selectedOption =
    options.find((opt) => opt.id === value)?.name || placeholder;

  return (
    <div>
      {label && <label className={styles.label}>{label}</label>}
      <div
        ref={dropdownRef} 
        className={styles.selectWrapper}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div
          className={`${styles.select} ${!isPlaceholderActive ? styles.selected : ''}`}
        >
          {selectedOption}
          <span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}>
            <svg  fill="none">
              <use href={`${icons}#down`} />
            </svg>
          </span>
        </div>
        {isOpen && (
          <ul className={styles.dropdown}>
            {options.map((opt) => (
              <li
                key={opt.id}
                className={styles.dropdownItem}
                onClick={() => handleSelect(opt.id)}
              >
                {opt.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DropdownSelector;