import React, { useEffect } from 'react';
import styles from './Profile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../hooks/useModal';
import PathInfo from '../../components/ui/PathInfo/PathInfo';
import MainTitle from '../../components/ui/MainTitle/MainTitle';
import SubTitle from '../../components/ui/SubTitle/SubTitle';
import Button from '../../components/Button/Button';
import RecipePreview from '../../components/RecipePreview/RecipePreview';
import UserInfo from '../../components/UserInfo/UserInfo';
import TabsList from '../../components/TabsList/TabsList';
import ListItems from '../../components/ListItems/ListItems';
import { fetchCurrentUser } from '../../redux/users/userSlice'; 

const Profile = () => {
  const { openModal } = useModal();
  const dispatch = useDispatch();
  const { current, loading, error } = useSelector(state => state.user); 

  useEffect(() => {
    dispatch(fetchCurrentUser()); 
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <PathInfo current="Profile" />
      <MainTitle text="Profile" />
      <SubTitle text="Reveal your culinary art, share your favorite recipe, and create gastronomic masterpieces with us." />
      <div className={styles.wrapper}>
        <div>
          {current ? (
            <UserInfo user={current} isOwnProfile={true} /> 
          ) : (
            <div>No user data available.</div>
          )}
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
