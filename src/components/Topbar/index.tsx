import styled from "@emotion/styled";
import { Logo } from "./Logo/Logo";
import { Settings } from "../Settings";

export const Topbar = () => (
  <Root>
    <Logo />
    <Settings />
  </Root>
);

export const Root = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px;
  background-color: ${({ theme: t }) => t.color.primary600};
  color: white;
`;
