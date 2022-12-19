import Sidebar from '../../components/Sidebar';
import { Outlet } from 'react-router-dom';
import AppHeader from '../../components/AppHeader';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

function App({}) {
  const [isShowSideBar, setIsShowSideBar] = useState(false);
  const isLgMediaQuery = useMediaQuery({
    query: '(min-width:1024px)',
  });

  useEffect(() => {
    if (!isLgMediaQuery) {
      setIsShowSideBar(false);
    }
  }, [isLgMediaQuery]);

  return (
    <section className='flex h-screen text-black bg-gradient-to-b from-blue-500 to-mainBlue '>
      {(isLgMediaQuery || isShowSideBar) && (
        <Sidebar
          isShowSideBar={isShowSideBar}
          setIsShowSideBar={setIsShowSideBar}
        />
      )}
      <main className=' grow py-6 px-8 overflow-y-auto'>
        <AppHeader
          isShowSideBar={isShowSideBar}
          setIsShowSideBar={setIsShowSideBar}
        />
        <Outlet />
      </main>
    </section>
  );
}

export default App;
