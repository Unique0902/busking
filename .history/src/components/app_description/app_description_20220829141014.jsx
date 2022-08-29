import React from 'react';
import styles from './app_description.module.css';

const App_description = (props) => {
  return (
    <section className={styles.appDescription}>
      <section>
        <h2>노래책은 이런게 가능하답니다</h2>
        <p>당신만의 노래리스트 생성하세요.</p>
      </section>
      <section>하단태그 인스타 유튜브 링크등 제품 소개</section>
    </section>
  );
};

export default App_description;
