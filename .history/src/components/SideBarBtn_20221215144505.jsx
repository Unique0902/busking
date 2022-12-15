import React from 'react';

export default function SideBarBtn({ name, onClick, selectedBtn, children }) {
  return (
    <li
      onClick={onClick}
      className={`${btnStyle} ${
        selectedBtn === name ? 'text-blue-400' : 'text-white'
      } `}
    >
      {children}
    </li>
  );
}
