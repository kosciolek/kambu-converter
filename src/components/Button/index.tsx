import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, {
  ComponentPropsWithoutRef,
  forwardRef,
  ReactNode,
  RefObject,
  useRef,
} from "react";
import { animated, useSpring } from "react-spring";
import { forwardCalls } from "../../utils/js";
import { useMergeRefs } from "../../hooks/useMergeRefs";

export type ButtonProps = {
  children?: ReactNode;
  labelProps?: ComponentPropsWithoutRef<typeof Label>;
  noWave?: boolean;
} & ComponentPropsWithoutRef<typeof Root>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      labelProps,
      children,
      onClick: onClickProp,
      variant = "text",
      noWave = false,
      ...buttonProps
    },
    ref
  ) => {
    const rootRef = useRef<HTMLButtonElement | null>(null);
    const mergedRef = useMergeRefs(ref, rootRef);

    const [rippleSpring, triggerRipple] = useRippleSpring(rootRef, !noWave);

    return (
      <Root
        type="button"
        ref={mergedRef}
        {...buttonProps}
        variant={variant}
        onClick={forwardCalls(triggerRipple, onClickProp)}
      >
        <Label {...labelProps}>{children}</Label>
        <Ripple style={rippleSpring} />
      </Root>
    );
  }
);

const useRippleSpring = (
  ref: RefObject<HTMLButtonElement>,
  enabled: boolean
) => {
  const [spring, springApi] = useSpring(() => ({
    opacity: 0,
    x: 0,
    y: 0,
    scale: 0,
  }));

  const onClick = (e: React.MouseEvent) => {
    if (!enabled) return;
    if (!ref.current) return;

    const { x: rootX, y: rootY } = ref.current.getBoundingClientRect();
    const { x: targetX, y: targetY } = (
      e.target as HTMLElement
    ).getBoundingClientRect();

    const { offsetX, offsetY } = e.nativeEvent;

    const x = targetX - rootX + offsetX;
    const y = targetY - rootY + offsetY;

    springApi.start({
      from: { opacity: 0.3, x, y, scale: 0 },
      opacity: 0,
      x,
      y,
      scale: 100,
    });
  };

  return [spring, onClick] as const;
};

export const UnstyledButton = styled.button`
  appearance: none;
  border: 0;
  background-color: transparent;
  font: inherit;
  color: inherit;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

const Root = styled(UnstyledButton)<{
  variant?: "text" | "colored";
  noPadding?: boolean;
}>`
  flex-shrink: 0;
  flex-grow: 0;
  appearance: none;
  border: 0;
  -webkit-tap-highlight-color: transparent;
  font-size: inherit;
  font-family: inherit;

  padding: ${(p) =>
    !p.noPadding && "9px 16px"}; // 9px padding to offset to a 4px grid
  text-transform: uppercase;
  font-weight: bold;
  display: inline-block;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  user-select: none;
  overflow: hidden;

  ${(p) =>
    p.variant === "colored" &&
    css`
      background-color: ${p.theme.color.primary400};
      color: white;

      &:hover {
        background-color: ${p.theme.color.primary500};
      }
    `};

  transition: background-color 240ms, transform 180ms;

  &:active {
    transform: translateY(2px);
  }
`;

const Ripple = styled(animated.span)`
  position: absolute;
  display: inline-block;
  background-color: currentColor;
  pointer-events: none;
  border-radius: 50%;
  top: 0;
  left: 0;
  width: 1px;
  height: 1px;
`;

const Label = styled.span``;
