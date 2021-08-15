import { MutableRefObject, RefCallback, useCallback } from "react";


/**
 * Merge multiple refs together.
 * @param refs Refs to be merged.
 */
export const useMergeRefs = <T>(
  ...refs: (RefCallback<T> | MutableRefObject<T> | null | undefined)[]
) =>
  useCallback((elem: T) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        /* Callback ref */
        ref(elem);
      } else if (!ref) {
        /* Null or undefined */
      } else {
        /* Object ref */
        ref.current = elem;
      }
    });
  }, refs);
