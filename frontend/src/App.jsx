import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Loader from './components/Loader/Loader';
import PrivateRoute from './components/PrivateRoute';
import { UserProvider } from './context/UserContext';
import { useUser } from './context/UserContext';

const Home = lazy(() => import('./pages/Home/Home'));
const Recipe = lazy(() => import('./pages/Recipe/Recipe'));
const AddRecipe = lazy(() => import('./pages/AddRecipe/AddRecipePage'));
const Profile = lazy(() => import('./pages/Profile/Profile'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

function App() {
  return (
    <UserProvider>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            {/* <Route
            path="/recipe"
            element={
              <PrivateRoute>
                <Recipe />
              </PrivateRoute>
            }
          /> */}
            {/* <Route
            path="/recipe/add"
            element={
              <PrivateRoute>
                <AddRecipe />
              </PrivateRoute>
            }
          /> */}
            <Route path="/recipe" element={<Recipe />} />
            <Route path="/recipe/add" element={<AddRecipe />} />
            <Route path="/user" element={<Profile />} />
            {/* <Route
            path="/user/:id"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          /> */}
            <Route path="/recipe/:id" element={<Recipe />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </UserProvider>
  );
}

export default App;
