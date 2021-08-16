import styled from "@emotion/styled";
import { FC } from "react";
import { Txt } from "../Txt";

export const Statistic = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
`;

export const StatisticTitle: FC = ({ children }) => (
  <Txt size="lg" weight={600}>
    {children}
  </Txt>
);

export const StatisticSubtitle = styled.div`
  font-size: 16px;
  color: ${({ theme: t }) => t.color.primary200};
  margin-bottom: 16px;
  text-align: center;
`;
