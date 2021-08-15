import styled from "@emotion/styled";
import { forwardRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";
import { animated, useTransition } from "react-spring";
import { useMergeRefs } from "../../hooks/useMergeRefs";
import { zIndex } from "../../style/const";
import { OptionType, SelectValue } from "./types";

export type OptionProps = {
  open: boolean;
  rootElement: HTMLElement | null;
  width: string;
  options: OptionType[];
  onChange: (value: SelectValue) => void;
  value: SelectValue | null;
};

export const Options = forwardRef<HTMLDivElement, OptionProps>(
  ({ open, rootElement, width, value, options, onChange }, ref) => {
    const transition = useOptionsTransition(open);

    const [optionsElem, setOptionsElem] = useState<HTMLElement | null>(null);
    const { styles, attributes } = usePopper(rootElement, optionsElem, {
      modifiers: popperModifiers,
    });

    const mergedRef = useMergeRefs(ref, setOptionsElem);

    return (
      <>
        {createPortal(
          transition(
            (style, innerOpen) =>
              innerOpen && (
                <Root
                  data-testid="options"
                  width={width}
                  ref={mergedRef}
                  // @ts-ignore
                  style={{
                    ...styles.popper,
                    ...style,
                    transformOrigin: `top center`,
                  }}
                  {...attributes.popper}
                >
                  {options.map(
                    ({ value: optionValue, render: optionDisplay }) => (
                      <Option
                        key={optionValue}
                        selected={value === optionValue}
                        onClick={() => onChange(optionValue)}
                      >
                        {optionDisplay ?? optionValue}
                      </Option>
                    )
                  )}
                </Root>
              )
          ),
          document.body
        )}
      </>
    );
  }
);

const useOptionsTransition = (open: boolean) =>
  useTransition(open, {
    from: { scale: 0.5, opacity: 0, pointerEvents: "none" },
    enter: { scale: 1, opacity: 1, pointerEvents: "all" },
    leave: { scale: 0.5, opacity: 0, pointerEvents: "none" },
    config: {
      tension: 1300,
      friction: 70,
    },
  });

const popperModifiers = [
  {
    name: "offset",
    options: {
      offset: [0, -64],
    },
  },
];

export const Root = styled(animated.div)<{ width: string }>`
  padding: 8px 0;
  width: ${(p) => p.width && `calc(${p.width} * 1.15)`};
  user-select: none;
  box-shadow: 2px 2px 2px rgba(86, 130, 110, 0.13);
  background-color: ${({ theme: t }) => t.color.primary50};
  border-radius: 4px;
  z-index: ${zIndex.select};
`;

export const Option = styled.div<{ selected?: boolean }>`
  padding: 8px 16px;
  cursor: pointer;
  background-color: ${(p) => p.selected && p.theme.color.primary200};

  transition: background-color 100ms;

  &:hover {
    background-color: ${({ theme: t }) => t.color.primary300};
  }

  &:active {
    background-color: ${({ theme: t }) => t.color.primary400};
  }
`;
