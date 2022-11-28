import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
const HoverTextBtn = ({ btnText, text }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className='relative font-sans text-lg text-black bg-white rounded-lg px-3 py-2'
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      {btnText}
      {isHovering && (
        <div className='absolute bg-white rounded-lg border border-black w-96 font-sans text-lg text-black'>
          {text}
        </div>
      )}
    </div>
  );
};

export default HoverTextBtn;
