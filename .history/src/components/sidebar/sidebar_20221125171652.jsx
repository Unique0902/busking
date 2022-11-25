import React from 'react';
import styles from './sidebar.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
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
const Sidebar = (props) => {
  const [isHide, setIsHide] = useState(false);
  let navigate = useNavigate();
  const btnStyle =
    'text-white pl-5 py-4 font-sans w-full text-left font-medium text-lg ';
  const iconStyle = 'mr-3';
  return (
    <>
      <aside
        className={` bg-zinc-800 text-black relative ${
          isHide ? 'w-16' : 'w-64'
        }`}
      >
        {!isHide && (
          <div className='flex items-center py-3 px-5  border-solid text-white border-gray-300 border-b'>
            <FontAwesomeIcon
              icon={faBookOpen}
              className={`${iconStyle} text-3xl`}
            />
            <p className=' font-sans text-3xl font-medium '>노래책</p>
          </div>
        )}

        <ul>
          {!isHide && (
            <>
              <li>
                <button
                  onClick={() => {
                    navigate('home');
                  }}
                  className={`${btnStyle} border-solid border-gray-300 border-b-10`}
                >
                  <FontAwesomeIcon icon={faHouse} className={iconStyle} />
                  Home
                </button>
              </li>
              <li>
                <p className='text-gray-300 my-3 ml-5'>기능 카테고리</p>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('add');
                  }}
                  className={btnStyle}
                >
                  <FontAwesomeIcon icon={faPlus} className={iconStyle} />
                  노래 추가
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('playlist');
                  }}
                  className={btnStyle}
                >
                  <FontAwesomeIcon icon={faMusic} className={iconStyle} />
                  Playlist 관리
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('inform');
                  }}
                  className={btnStyle}
                >
                  <FontAwesomeIcon icon={faUser} className={iconStyle} />내 정보
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('makebusking');
                  }}
                  className={btnStyle}
                >
                  <FontAwesomeIcon icon={faGuitar} className={iconStyle} />
                  버스킹하기
                </button>
              </li>
            </>
          )}

          <li>
            {isHide ? (
              <button
                className='absolute right-4 bottom-10 text-white'
                onClick={() => {
                  setIsHide(false);
                }}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            ) : (
              <button
                className='absolute right-4 bottom-10 text-white'
                onClick={() => {
                  setIsHide(true);
                }}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
            )}
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
