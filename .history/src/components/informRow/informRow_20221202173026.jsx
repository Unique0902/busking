import React from 'react';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const InformRow = ({ title, titleColor, onClick, children }) => {
  return (
    <button
      onClick={() => {
        onClick();
      }}
      className='flex w-full text-left flex-row items-center py-3 border-gray-300 border-b relative'
    >
      <h2
        className={`font-sans  text-2xl font-normal ${
          titleColor == 'red' ? 'text-red-500' : 'text-gray-500'
        }  w-36`}
      >
        {title}
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
