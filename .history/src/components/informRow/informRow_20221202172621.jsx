import React from 'react';

const InformRow = ({ text, textColor, children }) => {
  return (
    <button className='flex w-full text-left flex-row items-center pb-3 border-gray-300 border-b relative'>
      <h2 className='font-sans  text-2xl font-normal text-gray-500 w-36'>
        {text}
      </h2>
      {children}
      <FontAwesomeIcon
        icon={faChevronRight}
        className='absolute right-5 text-xl'
      />
    </button>
  );
};

export default InformRow;
