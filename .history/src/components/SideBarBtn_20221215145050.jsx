import React from 'react';

export default function SideBarBtn({ name, onClick, selectedBtn, children }) {
  return (
    <li
      onClick={() => {
        onClick(name);
      }}
      className={`text-white pl-5 py-4 font-sans w-full cursor-pointer text-left font-medium text-lg hover:bg-zinc-600 ${
        selectedBtn === name ? 'text-blue-400' : 'text-white'
      } `}
    >
      {children}
    </li>
  );
}
