import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import 'modern-normalize';

import Layout from './components/Layout/Layout';
import Loader from './components/Loader/Loader';

const Home = lazy(() => import('./pages/Home/Home'));
const Recipe = lazy(() => import('./pages/Recipe/Recipe'));
const Profile = lazy(() => import('./pages/Profile/Profile'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/add" element={<Recipe />}></Route>
            <Route path="/recipe/:id" element={<Recipe />}></Route>
            <Route path="/recipe/add" element={<Recipe />}></Route>
            <Route path="/user/:id" element={<Profile />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
