import { useEffect, RefObject } from "react";

export const useOnClickOutside = (
  refs: RefObject<HTMLElement> | RefObject<HTMLElement>[], 
  handler: () => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const refArray = Array.isArray(refs) ? refs : [refs];

      for (let i = 0; i < refArray.length; i += 1) {
        if (!refArray[i]?.current || refArray[i]?.current?.contains(event.target as Node)) {
          return;
        }
      }
      handler();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [refs, handler]);
};