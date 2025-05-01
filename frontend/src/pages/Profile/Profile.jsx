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
<<<<<<< HEAD
      <UserInfo/>
=======
      <Button onClick={() => openModal('logout')}>Log Out</Button>
>>>>>>> 5d21ccea536db12d259733d1658f4c41974cd90a
      <RecipePreview />
    </>
  );
};

export default Profile;
