import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Loader from './components/Loader/Loader';
import PrivateRoute from './components/PrivateRoute';
import { UserProvider } from './context/UserProvider';
import ScrollTopButton from './components/ScrollToTop/ScrollToTop';
// import ErrorLogger from './ErrorLogger';

const Home = lazy(() => import('./pages/Home/Home'));
const Recipe = lazy(() => import('./pages/Recipe/Recipe'));
const AddRecipe = lazy(() => import('./pages/AddRecipe/AddRecipePage'));
const Profile = lazy(() => import('./pages/Profile/Profile'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

function App() {
  return (
    <UserProvider>
      {/* <ErrorLogger /> */}
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="/recipes/add"
              element={
                <PrivateRoute>
                  <AddRecipe />
                </PrivateRoute>
              }
            />
            <Route
              path="/users/current"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/users/:id"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="/recipes/:id" element={<Recipe />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <ScrollTopButton />
      </Suspense>
    </UserProvider>
  );
}

export default App;
