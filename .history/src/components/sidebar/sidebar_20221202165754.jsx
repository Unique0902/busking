import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
import { useEffect } from 'react';
const Sidebar = ({ isShowSideBar, setIsShowSideBar }) => {
  const [isHide, setIsHide] = useState(false);
  const [selectedBtn, setSelectedBtn] = useState('home');
  let navigate = useNavigate();
  let location = useLocation();
  useEffect(() => {
    if (location.pathname === '/busking/app/add') {
      setSelectedBtn('add');
    } else if (location.pathname === '/busking/app/playlist') {
      setSelectedBtn('playlist');
    } else if (location.pathname === '/busking/app/home') {
      setSelectedBtn('home');
    } else if (location.pathname === '/busking/app/inform') {
      setSelectedBtn('inform');
    } else if (location.pathname === '/busking/app/makebusking') {
      setSelectedBtn('makebusking');
    } else if (location.pathname === '/busking/app/busking') {
      setSelectedBtn('makebusking');
    }
  }, [location]);
  const btnStyle =
    'text-white pl-5 py-4 font-sans w-full text-left font-medium text-lg hover:bg-zinc-600 ';
  const hideBtnStyle =
    'text-white py-4 font-sans w-full font-medium text-lg hover:bg-zinc-600';
  const iconStyle = 'mr-4';
  return (
    <>
      <aside
        className={` bg-zinc-800 text-black relative max-lg:absolute max-lg:h-full ${
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
                  className={`${btnStyle} ${
                    selectedBtn === 'home' ? 'text-blue-400' : 'text-white'
                  } border-solid border-gray-600 border-b`}
                >
                  <FontAwesomeIcon icon={faHouse} className={iconStyle} />
                  Home
                </button>
              </li>
              <li>
                <p className='text-gray-400 text-sm my-3 ml-5'>기능 카테고리</p>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('add');
                  }}
                  className={`${btnStyle} ${
                    selectedBtn === 'add' ? 'text-blue-400' : 'text-white'
                  } `}
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
                  className={`${btnStyle} ${
                    selectedBtn === 'playlist' ? 'text-blue-400' : 'text-white'
                  }`}
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
                  className={`${btnStyle} ${
                    selectedBtn === 'inform' ? 'text-blue-400' : 'text-white'
                  }`}
                >
                  <FontAwesomeIcon icon={faUser} className={iconStyle} />내 정보
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('makebusking');
                  }}
                  className={`${btnStyle} ${
                    selectedBtn === 'makebusking'
                      ? 'text-blue-400'
                      : 'text-white'
                  }`}
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
                  className={`${hideBtnStyle} ${
                    selectedBtn === 'home' ? 'text-blue-400' : 'text-white'
                  } border-solid border-gray-600 border-b`}
                >
                  <FontAwesomeIcon icon={faHouse} />
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('add');
                  }}
                  className={`${hideBtnStyle} ${
                    selectedBtn === 'add' ? 'text-blue-400' : 'text-white'
                  }`}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('playlist');
                  }}
                  className={`${hideBtnStyle} ${
                    selectedBtn === 'playlist' ? 'text-blue-400' : 'text-white'
                  }`}
                >
                  <FontAwesomeIcon icon={faMusic} />
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('inform');
                  }}
                  className={`${hideBtnStyle} ${
                    selectedBtn === 'inform' ? 'text-blue-400' : 'text-white'
                  }`}
                >
                  <FontAwesomeIcon icon={faUser} />
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('makebusking');
                  }}
                  className={`${hideBtnStyle} ${
                    selectedBtn === 'makebusking'
                      ? 'text-blue-400'
                      : 'text-white'
                  }`}
                >
                  <FontAwesomeIcon icon={faGuitar} />
                </button>
              </li>
            </>
          )}

          <li>
            {isHide ? (
              <button
                className='absolute border-solid hover:text-gray-400 border-gray-600 border-t bottom-0 py-7 w-full text-white'
                onClick={() => {
                  setIsHide(false);
                }}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            ) : (
              <button
                className='absolute hover:text-gray-400 border-solid border-gray-600 border-t bottom-0 py-7 w-full text-right pr-5 text-white'
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
