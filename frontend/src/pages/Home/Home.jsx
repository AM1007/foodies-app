// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   Hero,
//   Categories,
//   Recipes,
//   Testimonials,
// } from '../../components/sections';
import Hero from '../../components/sections/Hero/Hero';
// import { fetchCategories } from '../redux/categories/operations';
// import { selectIsCategoriesVisible } from '../redux/categories/selectors';

const HomePage = () => {
  // const dispatch = useDispatch();
  // const showCategories = useSelector(selectIsCategoriesVisible);

  // useEffect(() => {
  //   dispatch(fetchCategories());
  // }, [dispatch]);

  return (
    <main>
      <Hero />
      {/* {showCategories ? <Categories /> : <Recipes />} */}
      {/* <Testimonials /> */}
    </main>
  );
};

export default HomePage;
