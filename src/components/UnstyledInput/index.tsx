import styled from "@emotion/styled";

export const UnstyledInput = styled.input`
  appearance: none;
  background-color: #00000000;
  color: inherit;
  border-radius: 0;
  border: 0;
  font: inherit;
  padding: 0;

  &:focus {
    outline: 0;
  }
`;
