import React from 'react';
import { useModal } from '../../hooks/useModal';
import PathInfo from '../../components/ui/PathInfo/PathInfo';
import MainTitle from '../../components/ui/MainTitle/MainTitle';
import Subtitle from '../../components/ui/Subtitle/Subtitle';
import Button from '../../components/Button/Button';
import RecipePreview from '../../components/RecipePreview/RecipePreview';
import UserInfo from '../../components/UserInfo/UserInfo';

const Profile = () => {
  const { openModal } = useModal();

  return (
    <div class="container">
      <PathInfo current="Profile" />
      <MainTitle text="Profile" />
      <Subtitle text="Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces with us." />
      <Button onClick={() => openModal('logout')}>Log Out</Button>
      <UserInfo/>
      <RecipePreview />
    </div>
  );
};

export default Profile;
