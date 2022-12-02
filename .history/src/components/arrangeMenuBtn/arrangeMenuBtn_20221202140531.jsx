import React, { useState } from 'react';
import ArrangeMenu from '../arrangeMenu/arrangeMenu';

const ArrangeMenuBtn = ({ results, setResults, isBusking }) => {
  const [isShowArrangeMenu, setIsShowArrangeMenu] = useState(false);

  return (
    <div className='relative'>
      <button
        className='ml-5 bg-blue-600 py-2 px-3 text-lg rounded-lg text-white hover:scale-125'
        onClick={() => {
          setIsShowArrangeMenu(true);
        }}
      >
        정렬
      </button>
      {isShowArrangeMenu && (
        <ArrangeMenu
          setIsShowArrangeMenu={setIsShowArrangeMenu}
          results={results}
          setResults={setResults}
          isBusking={isBusking}
        />
      )}
    </div>
  );
};

export default ArrangeMenuBtn;
