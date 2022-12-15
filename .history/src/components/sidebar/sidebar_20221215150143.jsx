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
import SideBarBtn from '../SideBarBtn';

const Sidebar = ({ isShowSideBar, setIsShowSideBar }) => {
  const [isHide, setIsHide] = useState(false);
  const [selectedBtn, setSelectedBtn] = useState('home');
  let navigate = useNavigate();
  let location = useLocation();
  const wrapperRef = useRef();
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
  const isLgMediaQuery = useMediaQuery({
    query: '(max-width:1024px)',
  });
  const btnStyle =
    'text-white pl-5 py-4 font-sans w-full text-left font-medium text-lg hover:bg-zinc-600 ';
  const hideBtnStyle =
    'text-white py-4 font-sans w-full font-medium text-lg hover:bg-zinc-600';
  const iconStyle = 'mr-4';
  const onBtnClick = (name) => {
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
              className={`${iconStyle} text-2xl text-blue-400`}
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
              <SideBarBtn
                name={'home'}
                onClick={onBtnClick}
                selectedBtn={selectedBtn}
                isHide={isHide}
                text={'Home'}
              >
                <FontAwesomeIcon icon={faHouse} className={iconStyle} />
              </SideBarBtn>
              <li>
                <p className='border-solid border-gray-600 border-t text-gray-400 text-sm pt-3 pb-3 pl-5'>
                  기능 카테고리
                </p>
              </li>

              <SideBarBtn
                name={'add'}
                onClick={onBtnClick}
                selectedBtn={selectedBtn}
                isHide={isHide}
                text={'노래 추가'}
              >
                <FontAwesomeIcon icon={faPlus} className={iconStyle} />
              </SideBarBtn>
              <SideBarBtn
                name={'playlist'}
                onClick={onBtnClick}
                selectedBtn={selectedBtn}
                isHide={isHide}
                text={'Playlist 관리'}
              >
                <FontAwesomeIcon icon={faMusic} className={iconStyle} />
              </SideBarBtn>
              <SideBarBtn
                name={'inform'}
                onClick={onBtnClick}
                selectedBtn={selectedBtn}
                isHide={isHide}
                text={'내 정보'}
              >
                <FontAwesomeIcon icon={faUser} className={iconStyle} />
              </SideBarBtn>
              <SideBarBtn
                name={'makebusking'}
                onClick={onBtnClick}
                selectedBtn={selectedBtn}
                isHide={isHide}
                text={'버스킹하기'}
              >
                <FontAwesomeIcon icon={faGuitar} className={iconStyle} />
              </SideBarBtn>
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
