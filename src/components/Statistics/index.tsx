import styled from "@emotion/styled";
import { Average } from "./Average";
import { ExchangeRate } from "./ExchangeRate";
import { Highest } from "./Highest";
import { Total } from "./Total";

export const Statistics = () => (
  <>
    <Root>
      <ExchangeRate />
      <Highest />
      <Total />
      <Average />
    </Root>
  </>
);

export const Root = styled.div`
  background-color: ${({ theme: t }) => t.color.primary600};
  color: white;
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 100%;

  & > * + * {
    margin-top: 24px;
  }

  & > * {
    &:after {
      content: "";
      display: block;
      width: 100%;
      height: 1px;
      background-color: currentColor;
      opacity: 0.2;
      margin-top: 24px;
    }
  }

  & > *:first-child {
    &:before {
      content: "";
      display: block;
      width: 100%;
      height: 1px;
      background-color: currentColor;
      opacity: 0.2;
      margin-bottom: 24px;
    }
  }
`;
