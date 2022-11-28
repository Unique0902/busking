import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
const InfoBtn = ({ btnText, text }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className='relative'
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      {btnText}
      {isHovering && (
        <div className='absolute bg-white w-48 font-sans text-xs text-gray-600'>
          {text}
        </div>
      )}
    </div>
  );
};

export default InfoBtn;
