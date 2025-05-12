import { useState, useEffect, useRef } from 'react';
import styles from './DropdownSelector.module.css';
import icons from '../../../icons/sprite.svg';

const DropdownSelector = ({
  label,
  options,
  value,
  onChange,
  placeholder = '',
  error,
  className,
  labelClassName,
  wrapperClassName
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaceholderActive, setIsPlaceholderActive] = useState(!value);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
        setFilteredOptions(options);
      }
    };
    
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [options]);

  useEffect(() => {
    setIsPlaceholderActive(!value);
  }, [value]);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  const handleSelect = (val) => {
    onChange(val);
    setIsOpen(false);
    setIsPlaceholderActive(false);
    setSearchTerm('');
    setFilteredOptions(options);
  };

  const handleClear = (e) => {
    e.stopPropagation(); 
    onChange(''); 
    setIsPlaceholderActive(true);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredOptions(options);
    } else {
      const filtered = options.filter(option => 
        option.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
  };

  const handleOpenDropdown = () => {
    setIsOpen(prev => !prev);
    if (!isOpen) {
      setTimeout(() => {
        searchInputRef.current && searchInputRef.current.focus();
      }, 10);
    } else {
      setSearchTerm('');
      setFilteredOptions(options);
    }
  };

  const selectedOption =
    options.find((opt) => opt.id === value)?.name || '';

  return (
    <div className={`${className || ''}`}>
      {label && <label className={`${styles.label} ${labelClassName || ''}`}>{label}</label>}
      <div
        ref={dropdownRef}
        className={`${styles.selectWrapper} ${wrapperClassName || ''} ${error ? styles.error : ''}`}
      >
        {isOpen ? (
          <div className={styles.selectInput}>
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder={placeholder}
              className={styles.searchInput}
              onClick={(e) => e.stopPropagation()}
            />
            <span 
              className={`${styles.arrow}`}
              onClick={handleOpenDropdown}
            >
              <svg fill="none">
                <use href={`${icons}#up`} />
              </svg>
            </span>
          </div>
        ) : (
          <div
            className={`${styles.select} ${!isPlaceholderActive ? styles.selected : ''}`}
            onClick={handleOpenDropdown}
          >
            {selectedOption || placeholder}
            
            <div className={styles.selectControls}>
              {!isPlaceholderActive && (
                <button 
                  type="button"
                  className={styles.clearButton}
                  onClick={handleClear}
                  aria-label="Clear selection"
                >
                  <svg fill="none" className={styles.clearIcon}>
                    <use href={`${icons}#close`} />
                  </svg>
                </button>
              )}
              
              <span className={styles.arrow}>
                <svg fill="none">
                  <use href={`${icons}#down`} />
                </svg>
              </span>
            </div>
          </div>
        )}
        
        {isOpen && (
          <ul className={styles.dropdown}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <li
                  key={opt.id}
                  className={styles.dropdownItem}
                  onClick={() => handleSelect(opt.id)}
                >
                  {opt.name}
                </li>
              ))
            ) : (
              <li className={styles.noResults}>No results found</li>
            )}
          </ul>
        )}
      </div>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default DropdownSelector;