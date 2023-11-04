import { useEffect } from 'react';

export const useOnClickOutside = (refs, handler) => {
  useEffect(() => {
    const listener = (event) => {
      for (let i = 0; i < refs.length; i += 1) {
        if (!refs[i]?.current || refs[i]?.current?.contains(event?.target)) return;
      }
      handler();
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [refs, handler]);
};
