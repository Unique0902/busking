import React from 'react';

const MainSec = ({ isFullSize, children }) => {
  return (
    <section
      className={` ${
        isFullSize ? ' w-full' : ' w-3/4'
      } bg-white flex flex-col items-center rounded-2xl m-auto mt-8 p-10 max-lg:p-4 relative`}
    >
      <div className='w-full'>{children}</div>
    </section>
  );
};

export default MainSec;
