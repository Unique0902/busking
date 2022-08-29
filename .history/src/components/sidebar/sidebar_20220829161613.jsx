import React from 'react';
import styles from './sidebar.module.css';

const Sidebar = (props) => {
  return (
    <>
      <aside className={styles.sideBar}>
        <div className={styles.logo}>
          <img src='' alt='' />
          <p>노래책</p>
        </div>
        <ul className={styles.list}>
          <li>
            <button className={styles.listBtn}>home</button>
          </li>
          <li>
            <p className={styles.category}>기능 카테고리</p>
          </li>
          <li>
            <button className={styles.listBtn}>노래추가</button>
          </li>
          <li>
            <button className={styles.listBtn}>플레이리스트</button>
          </li>
          <li>
            <button className={styles.listBtn}>내정보</button>
          </li>
          <li>
            <button className={styles.listBtn}>버스킹하기</button>
          </li>
          <li>
            <button className={styles.listBtn}>설정</button>
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
