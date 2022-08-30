import React from 'react';

const Page_num_screen = ({ resultNum, pageNum, onPagePlus, onPageMinus }) => {
  return (
    <>
      <button>{'<'}</button>
      <p>pageNum/</p>
      <p>{parseInt(resultNum / 6)}</p>
      <button>{'>'}</button>
    </>
  );
};

export default Page_num_screen;
