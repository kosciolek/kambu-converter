import { RefObject, useCallback } from "react";
import { useWindowEvent } from "./useWindowEvent";

/**
 * Listen to clicks made outside of ignored areas.
 * @param ignoredRefs Ana array of refs whose children (and the refs) should be ignored
 * @param callback Called when an outside click is registered
 */
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
