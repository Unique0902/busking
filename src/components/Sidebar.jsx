import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
import { useMediaQuery } from 'react-responsive';
import SideBarBtn from './SideBarBtn';

const Sidebar = ({ isShowSideBar, setIsShowSideBar }) => {
  const [isHide, setIsHide] = useState(false);
  const [selectedBtn, setSelectedBtn] = useState('home');
  let navigate = useNavigate();
  let location = useLocation();
  const wrapperRef = useRef();
  const checkSelectedBtn = () => {
    const pathArr = location.pathname.split('/');
    if (pathArr[2] === 'busking') {
      setSelectedBtn('makeBusking');
    } else {
      setSelectedBtn(pathArr[2]);
    }
  };
  useEffect(() => {
    checkSelectedBtn();
  }, [location]);
  const isLgMediaQuery = useMediaQuery({
    query: '(max-width:1024px)',
  });
  const handelClick = (name) => {
    navigate(name);
    if (isLgMediaQuery) {
      setIsShowSideBar(false);
    }
  };
  useEffect(() => {
    if (isLgMediaQuery) {
      function handleClickOutside(event) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
          setIsShowSideBar(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [wrapperRef]);

  return (
    <>
      <aside
        ref={wrapperRef}
        className={` bg-zinc-800 text-black relative max-lg:absolute max-lg:h-full max-lg:z-40 ${
          isHide ? 'w-16' : 'w-64'
        }`}
      >
        {!isHide && (
          <div className='flex items-center py-3 px-5  border-solid text-white border-gray-600 border-b'>
            <FontAwesomeIcon
              icon={faBookOpen}
              className={`mr-4 text-2xl text-blue-400`}
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
          <SideBarBtn
            name={'home'}
            onClick={handelClick}
            selectedBtn={selectedBtn}
            isHide={isHide}
            text={'Home'}
            icon={faHouse}
          />
          {!isHide && (
            <li>
              <p className='border-solid border-gray-600 border-t text-gray-400 text-sm pt-3 pb-3 pl-5'>
                기능 카테고리
              </p>
            </li>
          )}
          <SideBarBtn
            name={'add'}
            onClick={handelClick}
            selectedBtn={selectedBtn}
            isHide={isHide}
            text={'노래 추가'}
            icon={faPlus}
          />
          <SideBarBtn
            name={'playlist'}
            onClick={handelClick}
            selectedBtn={selectedBtn}
            isHide={isHide}
            text={'Playlist 관리'}
            icon={faMusic}
          />
          <SideBarBtn
            name={'inform'}
            onClick={handelClick}
            selectedBtn={selectedBtn}
            isHide={isHide}
            text={'내 정보'}
            icon={faUser}
          />
          <SideBarBtn
            name={'makebusking'}
            onClick={handelClick}
            selectedBtn={selectedBtn}
            isHide={isHide}
            text={'버스킹하기'}
            icon={faGuitar}
          />

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
                  if (isLgMediaQuery) {
                    setIsShowSideBar(false);
                  } else {
                    setIsHide(true);
                  }
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
