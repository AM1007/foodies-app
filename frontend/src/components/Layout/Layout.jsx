import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <header>
        <h2>Hello World</h2>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
