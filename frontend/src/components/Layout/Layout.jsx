import { Outlet } from 'react-router-dom';
import Footer from '../sections/Footer/Footer';

const Layout = () => {
  return (
    <>
      <header>
        <h2>Hello World</h2>
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
