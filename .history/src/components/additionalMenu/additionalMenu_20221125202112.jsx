import React from 'react';
import { useRef } from 'react';

const AdditionalMenu = ({ setIsShowAdditionalMenu }) => {
  const wrapperRef = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        alert('You clicked outside of me!');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);
  return (
    <div ref={wrapperRef} className=' w-5 h-5 bg-white text-black absolute'>
      <h1>hi</h1>
    </div>
  );
};

export default AdditionalMenu;
