import styled from "@emotion/styled";
import React, { ReactNode, useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { animated, useTransition } from "react-spring";
import { useClickOutside } from "../../hooks/useClickOutside";
import { zIndex } from "../../style/const";

export type DialogRenderFunc = (args: {
  open: () => void;
  toggle: () => void;
  close: () => void;
  set: (state: boolean) => void;
}) => ReactNode;

export type DialogProps = {
  action: DialogRenderFunc;
  content: DialogRenderFunc;
};

export const Dialog = ({ action, content }: DialogProps) => {
  const [open, setOpen] = useState(false);

  const dialogMethods = useMemo(
    () => ({
      open: () => setOpen(true),
      toggle: () => setOpen((prev) => !prev),
      close: () => setOpen(false),
      set: (state: boolean) => setOpen(state),
    }),
    []
  );

  const transition = useTransition(open, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      mass: 0.5,
      tension: 1300,
      friction: 60,
    },
  });

  const rootRef = useRef<HTMLDivElement | null>(null);
  useClickOutside([rootRef], () => setOpen(false));

  return (
    <>
      {action(dialogMethods)}
      {transition(
        (style, show) =>
          show &&
          ReactDOM.createPortal(
            <Backdrop style={style}>
              <Root ref={rootRef}>{content(dialogMethods)}</Root>
            </Backdrop>,
            document.body
          )
      )}
    </>
  );
};

export const Backdrop = styled(animated.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${zIndex.dialog};
  background-color: #00000022;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Root = styled.div`
  width: 500px;
  max-width: 90vw;
  padding: 24px;
  background-color: white;
  box-shadow: 0 2px 3px 1px ${({ theme: t }) => t.color.primary800}16;
  border: 1px solid ${({ theme: t }) => t.color.primary600};
  border-radius: 4px;
  overflow-y: auto;
  max-height: 60vh;
`;

export * from "./subcomponents";
