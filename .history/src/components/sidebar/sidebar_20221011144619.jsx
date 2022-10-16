import React from 'react';
import styles from './sidebar.module.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = (props) => {
  let navigate = useNavigate();
  return (
    <>
      <aside className={styles.sideBar}>
        <div className={styles.logo}>
          <img src='' alt='' />
          <p>노래책</p>
        </div>
        <ul className={styles.list}>
          <li>
            <button
              onClick={() => {
                navigate('home');
              }}
              className={styles.listBtn}
            >
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
          <li>
            <button
              onClick={() => {
                navigate('setting');
              }}
              className={styles.listBtn}
            >
              설정
            </button>
          </li>
          <li>
            <button className={styles.closeBtn}> {'<'} </button>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;