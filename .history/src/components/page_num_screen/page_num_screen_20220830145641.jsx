import React from 'react';

const Page_num_screen = ({ resultNum, pageNum, onPagePlus, onPageMinus }) => {
  return (
    <>
      <button onClick={() => onPageMinus()}>{'<'}</button>
      <p>{pageNum}/</p>
      <p>{parseInt(resultNum / 6)}</p>
      <button onClick={() => onPagePlus()}>{'>'}</button>
    </>
  );
};

export default Page_num_screen;
