import styled from "@emotion/styled";
import { Content } from "../Content";
import { Grid } from "../Grid";
import { ExchangeRate } from "./ExchangeRate";
import { Highest } from "./Highest";
import { Logo } from "./Logo/Logo";
import { Settings } from "./Settings";
import { Total } from "./Total";

export const Top = () => (
  <>
    <Root>
      <Content>
        <Topmost>
          <Logo />
          <Settings />
        </Topmost>
        <Padding>
          <Grid spacing={48} container>
            <Grid item xs={12} sm={12} md={4}>
              <ExchangeRate />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Highest />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Total />
            </Grid>
          </Grid>
        </Padding>
      </Content>
    </Root>
  </>
);

export const Root = styled.div`
  background-color: ${({ theme: t }) => t.color.primary600};
  color: white;
`;

export const Topmost = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
`;

export const Padding = styled.div`
  padding: 32px 0;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Bar = styled.div`
  width: 2px;
  flex-shrink: 0;
  opacity: 0.4;
  color: white;
`;

export const RateRoot = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > * + * {
    margin-left: 24px;
  }
`;
