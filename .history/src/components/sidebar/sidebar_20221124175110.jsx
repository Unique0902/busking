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
} from '@fortawesome/free-solid-svg-icons';
const Sidebar = (props) => {
  const [isHide, setIsHide] = useState(false);
  let navigate = useNavigate();
  return (
    <>
      <aside
        className={` bg-zinc-800 text-black relative ${
          isHide ? styles.hide : styles.open
        }`}
      >
        {!isHide && (
          <div className='flex items-center p-3 border-solid text-white border-gray-300 border-b'>
            <FontAwesomeIcon icon={faBookOpen} className='text-3xl' />
            <p className='ml-3 font-sans text-3xl font-medium '>노래책</p>
          </div>
        )}

        <ul className={styles.list}>
          {!isHide && (
            <>
              <li>
                <button
                  onClick={() => {
                    navigate('home');
                  }}
                  className='text-white flex justify-around items-center px-20 w-full py-4 font-sans text-xl border-solid border-gray-300 border-b-10'
                >
                  <FontAwesomeIcon icon={faHouse} />
                  Home
                </button>
              </li>
              <li>
                <p className={styles.category}>기능 카테고리</p>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('add');
                  }}
                  className='text-white flex justify-around items-center px-16 w-full py-4 font-sans text-xl '
                >
                  <FontAwesomeIcon icon={faPlus} />
                  노래추가
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('playlist');
                  }}
                  className='text-white flex justify-around items-center px-16 w-full py-4 font-sans text-xl '
                >
                  <FontAwesomeIcon icon={faMusic} />
                  playlist
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('inform');
                  }}
                  className='text-white flex justify-around items-center px-16 w-full py-4 font-sans text-xl '
                >
                  <FontAwesomeIcon icon={faUser} />
                  내정보
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('makebusking');
                  }}
                  className='text-white flex justify-around items-center px-16 w-full py-4 font-sans text-xl '
                >
                  <FontAwesomeIcon icon={faGuitar} />
                  버스킹하기
                </button>
              </li>
            </>
          )}

          <li>
            {isHide ? (
              <button
                className={styles.openBtn}
                onClick={() => {
                  setIsHide(false);
                }}
              >
                {' '}
                {'>'}{' '}
              </button>
            ) : (
              <button
                className={styles.closeBtn}
                onClick={() => {
                  setIsHide(true);
                }}
              >
                {' '}
                {'<'}{' '}
              </button>
            )}
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
