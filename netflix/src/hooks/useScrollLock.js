import { useEffect, useRef } from 'react';

const useScrollLock = (isLocked) => {
  const originalStyle = useRef('');

  useEffect(() => {
    if (isLocked) {
      // Store the original overflow style
      originalStyle.current = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
    } else {
      // Restore the original overflow style
      document.body.style.overflow = originalStyle.current;
    }

    return () => {
      // Cleanup: restore original style when component unmounts
      document.body.style.overflow = originalStyle.current;
    };
  }, [isLocked]);
};

export default useScrollLock;
