import React from 'react';
import { useRef, useEffect } from 'react';
import ArrangeBtn from './ArrangeBtn';

const ArrangeMenu = ({
  setIsShowArrangeMenu,
  results,
  setResults,
  isBusking,
}) => {
  const wrapperRef = useRef();
  const arrangeResults = (type) => {
    switch (type) {
      case 'title':
        results.sort(function (a, b) {
          if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
          else if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
          else return 0;
        });
        break;
      case 'artist':
        results.sort(function (a, b) {
          if (a.artist.toLowerCase() > b.artist.toLowerCase()) return 1;
          else if (a.artist.toLowerCase() < b.artist.toLowerCase()) return -1;
          else return 0;
        });
        break;
      case 'time':
        results.sort(function (a, b) {
          return a.id - b.id;
        });
        break;
      case 'cnt':
        results.sort(function (a, b) {
          return b.cnt - a.cnt;
        });
        break;
    }
    setResults([...results]);
  };
  const onArrangeBtnClick = (type) => {
    arrangeResults(type);
    setIsShowArrangeMenu(false);
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsShowArrangeMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);
  return (
    <div
      ref={wrapperRef}
      className=' w-60 border-gray-600 border bg-white text-black absolute top-0 left-0 rounded-xl z-50'
    >
      <section className=' border-b border-gray-600 border-solid flex flex-col pt-2 pb-2'>
        <ArrangeBtn
          onClick={onArrangeBtnClick}
          type={'title'}
          text={'제목 문자순 정렬'}
        />
        <ArrangeBtn
          onClick={onArrangeBtnClick}
          type={'artist'}
          text={'가수 문자순 정렬'}
        />
        <ArrangeBtn
          onClick={onArrangeBtnClick}
          type={'time'}
          text={'시간순 정렬'}
        />
        {isBusking && (
          <ArrangeBtn
            onClick={onArrangeBtnClick}
            type={'cnt'}
            text={'신청자순 정렬'}
          />
        )}
      </section>
    </div>
  );
};

export default ArrangeMenu;