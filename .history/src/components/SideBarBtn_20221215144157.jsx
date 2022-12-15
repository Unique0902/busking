import React from 'react';

export default function SideBarBtn({ name }) {
  return (
    <li
      onClick={() => {
        navigate('add');
        if (isLgMediaQuery) {
          setIsShowSideBar(false);
        }
      }}
      className={`${btnStyle} ${
        selectedBtn === 'add' ? 'text-blue-400' : 'text-white'
      } `}
    >
      <FontAwesomeIcon icon={faPlus} className={iconStyle} />
      노래 추가
    </li>
  );
}
