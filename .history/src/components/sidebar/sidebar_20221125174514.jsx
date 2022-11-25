import React from 'react';
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
  const hideBtnStyle =
    'text-white py-4 font-sans w-full font-medium text-lg hover:bg-zinc-600';
  const iconStyle = 'mr-3';
  return (
    <>
      <aside
        className={` bg-zinc-800 text-black relative ${
          isHide ? 'w-16' : 'w-64'
        }`}
      >
        {!isHide && (
          <div className='flex items-center py-3 px-5  border-solid text-white border-gray-600 border-b'>
            <FontAwesomeIcon
              icon={faBookOpen}
              className={`${iconStyle} text-2xl text-blue-600`}
            />
            <p className=' font-sans text-2xl font-semibold '>노래책</p>
          </div>
        )}
        {isHide && (
          <div className='flex items-center text-blue-600 justify-center text-2xl w-full text-center py-4 border-solid border-gray-600 border-b'>
            <FontAwesomeIcon icon={faBookOpen} />
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
                  className={`${btnStyle} border-solid border-gray-600 border-b`}
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
          {isHide && (
            <>
              <li>
                <button
                  onClick={() => {
                    navigate('home');
                  }}
                  className={`${hideBtnStyle} border-solid border-gray-600 border-b`}
                >
                  <FontAwesomeIcon icon={faHouse} />
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('add');
                  }}
                  className={hideBtnStyle}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('playlist');
                  }}
                  className={hideBtnStyle}
                >
                  <FontAwesomeIcon icon={faMusic} />
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('inform');
                  }}
                  className={hideBtnStyle}
                >
                  <FontAwesomeIcon icon={faUser} />
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('makebusking');
                  }}
                  className={hideBtnStyle}
                >
                  <FontAwesomeIcon icon={faGuitar} />
                </button>
              </li>
            </>
          )}

          <li>
            {isHide ? (
              <button
                className='absolute border-solid border-gray-600 border-t bottom-0 py-7 w-full text-white'
                onClick={() => {
                  setIsHide(false);
                }}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            ) : (
              <button
                className='absolute border-solid border-gray-600 border-t bottom-0 py-7 w-full text-right pr-5 text-white'
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
