import React from 'react';

export default function SideBarBtn({ name, onClick, selectedBtn }) {
  return (
    <li
      onClick={onClick}
      className={`${btnStyle} ${
        selectedBtn === 'add' ? 'text-blue-400' : 'text-white'
      } `}
    >
      <FontAwesomeIcon icon={faPlus} className={iconStyle} />
      노래 추가
    </li>
  );
}
