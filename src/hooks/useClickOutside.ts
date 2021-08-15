import { RefObject, useCallback } from "react";
import { useWindowEvent } from "./useWindowEvent";

export const useClickOutside = (
  ignoredRefs: RefObject<HTMLElement | null>[],
  callback: (e: MouseEvent) => void
) => {
  useWindowEvent(
    "click",
    useCallback(
      (e: MouseEvent) => {
        if (
          !ignoredRefs.some((ignored) =>
            ignored.current?.contains(e.target as HTMLElement)
          )
        ) {
          callback(e);
        }
      },
      [callback, ignoredRefs]
    ),
    {
      capture: true,
    }
  );
};
