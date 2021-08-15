import styled from "@emotion/styled";
import { ReactNode, useMemo, useState } from "react";
import { animated, useSpring } from "react-spring";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useControlled } from "../../hooks/useControlled";
import { Label } from "../Label";
import arrow from "./arrow.svg";
import { Options } from "./Options";
import { OptionType, SelectValue } from "./types";

export type SelectProps = {
  value?: SelectValue | null;
  onChange?: (newValue: SelectValue) => void;
  renderValue?: (value: SelectValue) => ReactNode;
  renderOption?: (value: SelectValue) => ReactNode;
  width?: string;
  options: OptionType[];
  open?: boolean;
  onOpenChange?: (newOpen: boolean) => void;
  placeholder?: ReactNode;
  label?: string;
};

export const Select = ({
  onChange: onChangeProp,
  value: valueProp,
  width = "220px",
  options,
  label,
  open: openProp,
  onOpenChange: onOpenChangeProp,
  placeholder,
}: SelectProps) => {
  const [value, onChange] = useControlled({
    onChange: onChangeProp,
    value: valueProp,
    initial: null,
  });

  const [open, onOpenChange] = useControlled({
    initial: false,
    value: openProp,
    onChange: onOpenChangeProp,
  });

  const [rootElem, setRootElem] = useState<HTMLElement | null>(null);
  const [optionsElem, setOptionsElem] = useState<HTMLElement | null>(null);

  useClickOutside([{ current: rootElem }], () => onOpenChange(false));

  const arrowSpring = useArrowSpring(open);

  const valueNode = useMemo(
    () =>
      options.find((o) => o.value === value)?.render ??
      value ?? <Placeholder>{placeholder}</Placeholder>,
    [options, value, placeholder]
  );

  return (
    <Root>
      <StyledLabel>{label || " "}</StyledLabel>
      <Wrapper
        tabIndex={0}
        width={width}
        onClick={(e) => {
          if (!optionsElem || !optionsElem.contains(e.target as HTMLElement))
            onOpenChange(!open);
        }}
        ref={setRootElem}
      >
        <Value>{valueNode}</Value>
        <Arrow style={arrowSpring} />
        <Options
          value={value}
          onChange={onChange}
          open={open}
          options={options}
          rootElement={rootElem}
          width={width}
          ref={setOptionsElem}
        />
      </Wrapper>
    </Root>
  );
};

const useArrowSpring = (open: boolean) =>
  useSpring({
    ...(open ? { rotate: 180 } : { rotate: 0 }),
    config: {
      tension: 1300,
      friction: 70,
    },
  });

export const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledLabel = styled(Label)`
  margin-bottom: 4px;
`;

export const Wrapper = styled.div<{ width: string }>`
  display: inline-flex;
  align-items: center;

  border-radius: 4px;
  padding: 0 8px;
  height: 40px;
  width: ${(p) => p.width};
  cursor: pointer;
  position: relative;
  justify-content: space-between;
  user-select: none;
  overflow: hidden;

  background-color: ${({ theme: t }) => t.color.primary100};

  transition: background-color 200ms, border-color 200ms, box-shadow 200ms;
`;

export const Arrow = styled(animated.div)`
  margin-left: 8px;
  background: url("${arrow}");
  background-size: 100% 100%;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
`;

export const Value = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  flex-grow: 1;
`;

export const Placeholder = styled.span`
  opacity: 0.6;
`;
