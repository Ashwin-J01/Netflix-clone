import { useEffect, useRef } from 'react';

const useScrollLock = (isLocked) => {
  const originalStyle = useRef('');

  useEffect(() => {
    if (isLocked) {
      originalStyle.current = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalStyle.current;
    }

    return () => {
      
      document.body.style.overflow = originalStyle.current;
    };
  }, [isLocked]);
};

export default useScrollLock;
