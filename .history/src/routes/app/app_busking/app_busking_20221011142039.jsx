import React from 'react';
import styles from './app_busking.module.css';

const App_busking = (props) => {
  return (
    <>
      <h1>버스킹하기</h1>
      <section>
        <div>
          <h4>플레이리스트 선택</h4>
          <select name='playlists'>
            <option value='플레이리스트1'>플레이리스트1</option>
          </select>
        </div>
        <div>
          <h4>최대 곡수 제한</h4>
          <input type='number' name='' id='' />
        </div>
        <div>
          <h4>방 제목 설정</h4>
          <input type='text' name='' id='' />
        </div>
      </section>
      <button>버스킹 방 생성</button>
    </>
  );
};

export default App_busking;
