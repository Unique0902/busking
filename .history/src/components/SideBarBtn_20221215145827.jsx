import React from 'react';

export default function SideBarBtn({
  name,
  onClick,
  selectedBtn,
  isHide,
  children,
}) {
  const btnStyle =
    'text-white pl-5 py-4 font-sans w-full text-left cursor-pointer font-medium text-lg hover:bg-zinc-600 ';
  const hideBtnStyle =
    'text-white py-4 font-sans w-full cursor-pointer font-medium text-lg hover:bg-zinc-600';
  return (
    <li
      onClick={() => {
        onClick(name);
      }}
      className={`${isHide ? hideBtnStyle : btnStyle} ${
        selectedBtn === name ? 'text-blue-400' : 'text-white'
      } `}
    >
      {children}
    </li>
  );
}
