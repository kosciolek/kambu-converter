import styled from "@emotion/styled";
import React, {
  ComponentPropsWithoutRef,
  forwardRef,
  Ref,
  useRef,
} from "react";
import { useControlled } from "../../hooks/useControlled";
import { useId } from "../../hooks/useId";
import { useMergeRefs } from "../../hooks/useMergeRefs";
import { Label } from "../Label";
import { UnstyledInput } from "../UnstyledInput";

const preventDefault = (e: { preventDefault: () => any }) => e.preventDefault();

export type InputProps = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, newVal: string) => void;
  value?: string;
  label?: string;
  error?: string;
  inputRef?: Ref<HTMLInputElement>;
} & Omit<ComponentPropsWithoutRef<typeof StyledInput>, "value" | "onChange">;

export const Input = forwardRef<HTMLDivElement, InputProps>(
  (
    {
      label,
      onChange: onChangeProp,
      value: valueProp,
      className,
      error,
      inputRef: inputRefProp,
      ...inputProps
    },
    ref
  ) => {
    /* All props EXCEPT className, style and ref go to the input. */

    const [value, onChange] = useControlled({
      onChange: onChangeProp,
      value: valueProp,
      initial: "",
      extract: (e) => e.target.value,
    });

    const inputRef = useRef<HTMLInputElement | null>(null);

    const mergedInputRef = useMergeRefs(inputRef, inputRefProp);
    const onRootClick = () => {
      inputRef.current?.focus();
    };

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      onChange(e, newValue);
    };

    const id = useId();
    const inputId = `input-${id}`;

    return (
      <Root ref={ref} className={className} onMouseDown={preventDefault}>
        <Upper>
          <StyledLabel htmlFor={inputId}>{label || " "}</StyledLabel>
          <Error>{error || " "}</Error>
        </Upper>
        <InputWrapper error={Boolean(error)} onClick={onRootClick}>
          <StyledInput
            id={inputId}
            {...inputProps}
            value={value}
            onChange={onChangeHandler}
            ref={mergedInputRef}
          />
        </InputWrapper>
      </Root>
    );
  }
);

export const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputWrapper = styled.div<{ error?: boolean }>`
  display: inline-flex;
  align-items: center;
  border-radius: 4px;
  padding: 0 8px;
  cursor: text;
  flex-grow: 1;

  background-color: ${({ theme: t }) => t.color.primary50};

  transition: background-color 200ms, border-color 200ms, box-shadow 200ms;

  &:focus-within {
    background-color: white;
    box-shadow: 0 0 3px ${({ theme: t }) => t.color.primary400};
  }

  box-shadow: ${(p) => p.error && `0 0 3px 1px ${p.theme.color.error}`};
`;

export const StyledLabel = styled(Label)`
  margin-bottom: 4px;
`;

export const Error = styled.div`
  font-size: 14px;
  margin-top: 4px;
  color: ${({ theme: t }) => t.color.error};
`;

export const StyledInput = styled(UnstyledInput)`
  padding: 9px 0; // offset to 4px design grid
  font-weight: 600;
`;

export const Upper = styled.div`
  display: flex;
  justify-content: space-between;
`;
