import { useEffect } from "react";

/**
 * Listen for a native window events
 * @param event Event type
 * @param listener Directly passed to event options
 * @param capture Directly passed to event options
 * @param passive Directly passed to event options
 * @param once Directly passed to event options
 */
export const useWindowEvent = <K extends keyof WindowEventMap>(
  event: K,
  listener: (e: WindowEventMap[K]) => void,
  { capture, passive, once }: AddEventListenerOptions = {}
) => {
  useEffect(() => {
    const _listener = (e: WindowEventMap[K]) => listener(e);
    window.addEventListener(event, _listener, { capture, passive, once });
    return () => window.removeEventListener(event, _listener, { capture });
  }, [event, listener, capture, passive, once]);
};
