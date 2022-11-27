import React from 'react';
import styles from './page_num_screen.module.css';

const Page_num_screen = ({ resultNum, pageNum, onPagePlus, onPageMinus }) => {
  const btnStyle =
    'mx-2 bg-black text-white rounded-full hover:scale-125 text-center text-lg';
  return (
    <div className='flex justify-center'>
      <button className={btnStyle} onClick={() => onPageMinus()}>
        {'<'}
      </button>
      <p>{pageNum}/</p>
      <p>{parseInt((resultNum - 1) / 6) + 1}</p>
      <button className={btnStyle} onClick={() => onPagePlus()}>
        {'>'}
      </button>
    </div>
  );
};

export default Page_num_screen;
