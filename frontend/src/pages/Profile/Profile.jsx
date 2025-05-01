import RecipePreview from '../../components/RecipePreview/RecipePreview';
import React from 'react';
import Button from '../../components/Button/Button';
import { useModal } from '../../context/ModalContext';

const Profile = () => {
  const { openModal } = useModal();

  return (
    <>
      <p>Profile</p>
      <Button onClick={() => openModal('logout')}>Log Out</Button>
      <RecipePreview />
    </>
  );
};

export default Profile;
