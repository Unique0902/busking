import React from 'react';
import styles from './app_busking.module.css';

const App_busking = ({ buskingRepository }) => {
  return (
    <>
      <section>
        <div>qr코드</div>
        <div>공유url</div>
      </section>
      <section>
        <div>1</div>
        <div>블랙핑크</div>
        <div>불장난</div>
        <div>15</div>
        <div>신청자</div>
        <div>신청시간</div>
      </section>
      <button>신청자순 정렬</button>
      <button>시간순 정렬</button>
    </>
  );
};

export default App_busking;
