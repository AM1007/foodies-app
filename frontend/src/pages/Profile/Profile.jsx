import UserInfo from '../../components/UserInfo/UserInfo';
import RecipePreview from '../../components/RecipePreview/RecipePreview';
import React from 'react';
import Button from '../../components/Button/Button';
import { useModal } from '../../hooks/useModal';

const Profile = () => {
  const { openModal } = useModal();

  return (
    <>
      <p>Profile</p>
      <UserInfo/>
      <Button onClick={() => openModal('logout')}>Log Out</Button>
      <RecipePreview />
    </>
  );
};

export default Profile;
