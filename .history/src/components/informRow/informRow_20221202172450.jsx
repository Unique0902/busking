import React from 'react';

const InformRow = (props) => {
  return (
    <button className='flex w-full text-left flex-row items-center pb-3 border-gray-300 border-b relative'>
      <h2 className='font-sans  text-2xl font-normal text-gray-500 w-36'>
        닉네임
      </h2>
      <p>{userData && userData.name}</p>
      <FontAwesomeIcon
        icon={faChevronRight}
        className='absolute right-5 text-xl'
      />
    </button>
  );
};

export default InformRow;
