import React from 'react';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const InformRow = ({ title, titleColor, onClick, children }) => {
  return (
    <button
      onClick={() => {
        onClick();
      }}
      className={`flex w-full text-left flex-row ${
        titleColor == 'red' && 'hover:bg-gray-200'
      } items-center py-3 border-gray-300 border-b relative`}
    >
      <div className='flex flex-row items-center max-lg:flex-col'>
        <h2
          className={`font-sans  text-2xl font-normal ${
            titleColor == 'red' ? 'text-red-500' : 'text-gray-500'
          }  w-36`}
        >
          {title}
        </h2>
        {children}
      </div>

      <FontAwesomeIcon
        icon={faChevronRight}
        className={`absolute right-5 text-xl ${
          titleColor == 'red' ? 'text-red-500' : 'text-gray-500'
        }`}
      />
    </button>
  );
};

export default InformRow;
