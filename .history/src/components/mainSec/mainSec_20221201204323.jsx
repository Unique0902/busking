import React from 'react';

const MainSec = ({ hi, children }) => {
  return (
    <section className='bg-white flex flex-col items-center rounded-2xl m-auto w-3/4 mt-8 p-10 relative'>
      {children}
    </section>
  );
};

export default MainSec;
