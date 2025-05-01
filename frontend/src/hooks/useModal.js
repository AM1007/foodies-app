import { useContext } from 'react';
import { ModalContext } from '../context/ModalContext.js';

export const useModal = () => useContext(ModalContext);
