import Hero from '../../components/sections/Hero/Hero';
import Categories from '../../components/sections/Categories/Categories';
import Testimonials from '../../components/sections/Testimonials/Testimonials';
<<<<<<< HEAD
import RecipeList from '../../components/RecipeList/RecipeList';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from '../../redux/users/userSlice';
=======
>>>>>>> af355511652499df2344454de1feeaeb034d8fb3
// import Recipes from '../../components/sections/Recipes/Recipes';

// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCategories } from '../../redux/categories/operations';
// import { selectIsCategoriesVisible } from '../../redux/categories/selectors';

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.current);
  const loading = useSelector(state => state.user.loading);

  // useEffect(() => {
  //   if (!user && !loading) {
  //     dispatch(fetchCurrentUser());
  //   }
  // }, [dispatch, user, loading]);

  // const dispatch = useDispatch();
  // const showCategories = useSelector(selectIsCategoriesVisible);

  // useEffect(() => {
  //   dispatch(fetchCategories());
  // }, [dispatch]);

  return (
    <main>
      <Hero />
      <Categories />
      {/* {showCategories ? <Categories /> : <Recipes />} */}
      <Testimonials />
    </main>
  );
};

export default Home;
