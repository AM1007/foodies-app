// TimeController.js
import React, { useState, useEffect, useRef } from 'react';
import styles from './TimeController.module.css';

const presetOptions = [10, 20, 40, 60];

const TimeController = ({ value, onChange, minTime = 5, maxTime = 180, step = 1 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const decreaseTime = () => {
    if (value > minTime) {
      onChange(value - step);
    }
  };

  const increaseTime = () => {
    if (value < maxTime) {
      onChange(value + step);
    }
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.timeController} ref={dropdownRef}>
      <button
        className={styles.timeButton}
        onClick={decreaseTime}
        disabled={value <= minTime}
      >
        −
      </button>

      <div className={styles.dropdownWrapper}>
        <button className={styles.timeValue} onClick={toggleDropdown}>
          {value} min
        </button>
        {isOpen && (
          <ul className={styles.dropdown}>
            {presetOptions.map((option, index) => (
              <li
                key={index}
                className={styles.dropdownItem}
                onClick={() => handleSelect(option)}
              >
                {option} min
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        className={styles.timeButton}
        onClick={increaseTime}
        disabled={value >= maxTime}
      >
        +
      </button>
    </div>
  );
};

export default TimeController;
