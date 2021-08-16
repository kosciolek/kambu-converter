import styled from "@emotion/styled";
import logo from "./logo.svg";

export const Logo = () => (
  <Root>
    <img src={logo} alt="" />
    <Name>KAMBU CONVERTER</Name>
  </Root>
);

const Root = styled.div`
  display: flex;
  align-items: center;
`;

export const Name = styled.div`
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 900;
  color: white; // todo
  margin-left: 12px;
`;
