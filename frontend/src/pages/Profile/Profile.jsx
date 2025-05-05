import React from 'react';
import styles from './Profile.module.css';
import { useModal } from '../../hooks/useModal';
import PathInfo from '../../components/ui/PathInfo/PathInfo';
import MainTitle from '../../components/ui/MainTitle/MainTitle';
import SubTitle from '../../components/ui/SubTitle/SubTitle';
import Button from '../../components/Button/Button';
import RecipePreview from '../../components/RecipePreview/RecipePreview';
import UserInfo from '../../components/UserInfo/UserInfo';
import TabsList from '../../components/TabsList/TabsList';
import ListItems from '../../components/ListItems/ListItems';

const Profile = () => {
  const { openModal } = useModal();

  return (
    <div className="container">
      <PathInfo current="Profile" />
      <MainTitle text="Profile" />
      <SubTitle text="Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces with us." />
      <div className={styles.wrapper}>
        <div>
          <UserInfo />
          <Button onClick={() => openModal('logout')}>Log Out</Button>
        </div>
        <TabsList />
        <div>
          <ListItems />
        </div>
        <RecipePreview />
      </div>
    </div>
  );
};

export default Profile;
