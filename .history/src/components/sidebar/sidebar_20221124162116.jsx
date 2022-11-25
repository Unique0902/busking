import React from 'react';
import styles from './sidebar.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
const Sidebar = (props) => {
  const [isHide, setIsHide] = useState(false);
  let navigate = useNavigate();
  return (
    <>
      <aside
        className={` bg-white text-black relative ${
          isHide ? styles.hide : styles.open
        }`}
      >
        {!isHide && (
          <div className='flex items-center p-2 border-solid border-gray-300 border-b'>
            <img
              src={require('../../img/bookLogo.png')}
              alt=''
              className=' h-12 w-12 mr-3'
            />
            <p className='font-sans text-3xl font-medium text-black'>노래책</p>
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
                  className=' w-full py-5 font-sans text-xl'
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
                  className={styles.listBtn}
                >
                  노래추가
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('playlist');
                  }}
                  className={styles.listBtn}
                >
                  playlist
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('inform');
                  }}
                  className={styles.listBtn}
                >
                  내정보
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('makebusking');
                  }}
                  className={styles.listBtn}
                >
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
