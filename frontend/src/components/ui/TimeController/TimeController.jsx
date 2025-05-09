import React, { useState, useEffect, useRef } from 'react';
import styles from './TimeController.module.css';
import icons from '../../../icons/sprite.svg';

const presetOptions = [10, 20, 40, 60];

const TimeController = ({ 
  value, 
  onChange, 
  minTime = 1, 
  maxTime = 180, 
  step = 1, 
  label = 'Cooking Time',
  onBlur = () => {}
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const [wasInteracted, setWasInteracted] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const decreaseTime = () => {
    if (localValue > minTime) {
      const newValue = localValue - step;
      setLocalValue(newValue);
      onChange(newValue);
      setWasInteracted(true); 
    }
  };

  const increaseTime = () => {
    if (localValue < maxTime) {
      const newValue = localValue + step;
      setLocalValue(newValue);
      onChange(newValue);
      setWasInteracted(true); 
    }
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (option) => {
    setLocalValue(option);
    onChange(option);
    setIsOpen(false);
    setWasInteracted(true); 
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        onBlur();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onBlur]);

  return (
    <div className={styles.timeControllerWrapper}>
      <label className={styles.label}>{label}</label>
      <div className={styles.timeController} ref={dropdownRef}>
        <button
          type="button"
          className={styles.timeButton}
          onClick={decreaseTime}
          disabled={localValue <= minTime}
        >
          <svg fill='none' className={styles.controlBtn}>
            <use href={`${icons}#minus`}/>
          </svg>
        </button>

        <div >
          <button 
            type="button"
            className={`${styles.timeValue} ${wasInteracted ? styles.valueChanged : ''}`}
            onClick={toggleDropdown}
          >
            {localValue} min
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
          type="button"
          className={styles.timeButton}
          onClick={increaseTime}
          disabled={localValue >= maxTime}
        >
          <svg fill='none'>
            <use href={`${icons}#plus`}/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TimeController;