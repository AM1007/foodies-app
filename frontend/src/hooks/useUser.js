import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

export const useUser = () => {
  return useContext(UserContext);
};
