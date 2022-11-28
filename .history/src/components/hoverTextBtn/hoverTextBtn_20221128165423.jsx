import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
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
        <div className='absolute flex flex-row items-center right-0 bg-white rounded-lg border border-gray-500 p-3 w-auto'>
          <p className=' font-sans text-lg text-black'>{text}</p>
          <button>
            <FontAwesomeIcon icon={faCopy} className='text-xl ml-3' />
          </button>
        </div>
      )}
    </div>
  );
};

export default HoverTextBtn;
