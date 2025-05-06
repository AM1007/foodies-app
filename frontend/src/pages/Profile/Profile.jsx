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
import {
  fetchCurrentUser,
  fetchFollowers,
  fetchFollowing,
} from '../../redux/users/userSlice';
import {
  fetchOwnRecipes,
  fetchFavoriteRecipes,
} from '../../redux/recipes/recipesSlice';

const Profile = () => {
  const { openModal } = useModal();
  const dispatch = useDispatch();
  const { current, loading, error, followers, following } = useSelector(
    state => state.user,
  );
  const { ownRecipes, favoriteRecipes } = useSelector(state => state.recipes);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (current) {
      dispatch(fetchFollowers());
      dispatch(fetchFollowing());
      dispatch(fetchOwnRecipes());
      dispatch(fetchFavoriteRecipes());
    }
  }, [current, dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const followersCount = followers?.response?.length || 0;
  const followingCount = following?.response?.length || 0;

  return (
    <div className="container">
      <PathInfo current="Profile" />
      <MainTitle text="Profile" />
      <SubTitle text="Reveal your culinary art, share your favorite recipe, and create gastronomic masterpieces with us." />
      <div className={styles.wrapper}>
        <div className={styles.userCardWrapper}>
          {current ? (
            <UserInfo
              user={current}
              isOwnProfile={true}
              followersCount={followersCount}
              followingCount={followingCount}
            />
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
