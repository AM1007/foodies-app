import { useContext } from 'react';
import { ModalContext } from '../context/ModalContext';

export const useModal = () => useContext(ModalContext);
