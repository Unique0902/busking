import React from 'react';

const Page_num_screen = ({ resultNum, pageNum, onPagePlus, onPageMinus }) => {
  return (
    <>
      <button>{'<'}</button>
      <button>{'>'}</button>
      <h1>{resultNum}</h1>
      <h1>{pageNum}</h1>
    </>
  );
};

export default Page_num_screen;
