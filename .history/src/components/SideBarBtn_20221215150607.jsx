import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGuitar,
  faHouse,
  faMusic,
  faPlus,
  faUser,
  faBookOpen,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

export default function SideBarBtn({
  name,
  onClick,
  selectedBtn,
  isHide,
  text,
  iconName,
  children,
}) {
  const iconStyle = 'mr-4';
  const btnStyle =
    'text-white pl-5 py-4 font-sans w-full text-left cursor-pointer font-medium text-lg hover:bg-zinc-600 ';
  const hideBtnStyle =
    'text-white py-4 font-sans w-full cursor-pointer font-medium text-lg hover:bg-zinc-600 text-center';
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
      {!isHide && text}
    </li>
  );
}
