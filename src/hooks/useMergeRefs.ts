import { MutableRefObject, RefCallback, useCallback } from "react";

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
