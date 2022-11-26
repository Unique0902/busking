import React from 'react';
import { useRef } from 'react';

const AdditionalMenu = ({ setIsShowAdditionalMenu }) => {
  const wrapperRef = useRef();
  return (
    <div ref={wrapperRef} className=' w-5 h-5 bg-white text-black absolute'>
      <h1>hi</h1>
    </div>
  );
};

export default AdditionalMenu;
