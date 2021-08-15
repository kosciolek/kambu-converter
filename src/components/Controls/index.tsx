import styled from "@emotion/styled";
import React from "react";
import { media } from "../../style/media";
import { Content } from "../Content";
import { AddButton } from "./AddButton";
import { DeleteButton } from "./DeleteButton";
import { LastUpdated } from "./LastUpdated";

export const Controls = () => (
  <Content>
    <Root>
      <LastUpdated />
      <Buttons>
        <DeleteButton />
        <AddButton />
      </Buttons>
    </Root>
  </Content>
);

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 24px;

  flex-direction: column;

  ${media.sm} {
    flex-direction: row;
  }
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;

  & > * + * {
    margin-left: 24px;
  }
`;
