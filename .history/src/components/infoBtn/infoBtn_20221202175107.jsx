import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
const InfoBtn = ({ text }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className='relative'
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      <FontAwesomeIcon
        icon={faCircleInfo}
        className='text-blue-500 text-2xl max-lg:text-lg ml-3'
      />
      {isHovering && (
        <div className='absolute rounded-lg border border-gray-500 p-2 bg-white w-48 font-sans text-xs text-gray-600'>
          {text}
        </div>
      )}
    </div>
  );
};

export default InfoBtn;
