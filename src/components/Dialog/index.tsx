import styled from "@emotion/styled";
import React, {
  ComponentType,
  Fragment,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";
import { animated, useTransition } from "react-spring";
import { zIndex } from "../../style/const";

export type DialogMethods = {
  open: () => void;
  close: () => void;
  set: (state: boolean) => void;
};

export type DialogProps = {
  action: ComponentType<DialogMethods>;
  content: ComponentType<DialogMethods>;
  onClose?: () => void;
};

/* Todo trap focus */
export const Dialog = ({
  action: Action,
  content: Content,
  onClose,
}: DialogProps) => {
  const [open, setOpen] = useState(false);

  const dialogMethods = useMemo(
    () => ({
      open: () => setOpen(true),
      close: () => {
        onClose?.();
        setOpen(false);
      },
      set: (state: boolean) => {
        if (!state) onClose?.();
        setOpen(state);
      },
    }),
    []
  );

  const transition = useTransition(open, {
    key: open,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      mass: 0.5,
      tension: 1300,
      friction: 60,
    },
  });

  const backdropRef = useRef<HTMLDivElement | null>(null);
  const onBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) {
      dialogMethods.close();
    }
  };

  return (
    <>
      <Action {...dialogMethods} />
      {transition(
        (style, show) =>
          show && (
            <>
              {ReactDOM.createPortal(
                <Backdrop
                  key={show.toString()}
                  ref={backdropRef}
                  style={style}
                  onClick={onBackdropClick}
                >
                  <Root role="dialog">
                    <Content {...dialogMethods} />
                  </Root>
                </Backdrop>,
                document.body
              )}
            </>
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
