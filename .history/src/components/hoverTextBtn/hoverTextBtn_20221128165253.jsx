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
        <div className='absolute right-0 bg-white rounded-lg border border-gray-500 p-2 w-96 font-sans text-lg text-black'>
          {text}
          <button>
            <FontAwesomeIcon icon={faCopy} className='text-xl ml-3' />
          </button>
        </div>
      )}
    </div>
  );
};

export default HoverTextBtn;
