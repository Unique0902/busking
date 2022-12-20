const handleClickOutEvent = (wrapperRef, handleClickOther) => {
  function handleClickOutside(event) {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      handleClickOther();
    }
  }
  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
};

export { handleClickOutEvent };
