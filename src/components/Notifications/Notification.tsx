import styled from "@emotion/styled";
import { forwardRef } from "react";
import { animated } from "react-spring";
import { Button } from "../Button";
import { NotificationWithId } from "./types";
import { ReactComponent as CancelIcon } from "./cancel.svg";

export type NotificationProps = NotificationWithId & {
  onCancel: () => void;
};

export const Notification = forwardRef<HTMLDivElement, NotificationProps>(
  ({ content, title, onCancel }, ref) => (
    <Root ref={ref}>
      <Bar />
      <Content>
        <Head>
          <Title>{title}</Title>
          <Button noPadding onClick={onCancel}>
            <StyledCancelIcon />
          </Button>
        </Head>
        {content}
      </Content>
    </Root>
  )
);

export const Root = styled(animated.div)`
  pointer-events: all;
  padding: 12px;
  display: flex;
  background-color: white;
  border-radius: 4px;
  border: 2px solid ${({ theme: t }) => t.color.primary400};
`;
export const Bar = styled.div`
  flex-shrink: 0;
  width: 4px;
  border-radius: 1000px;
  background-color: ${({ theme: t }) => t.color.primary400};
  margin-right: 8px;
`;
export const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
`;
export const Title = styled.div`
  flex-grow: 1;
  color: ${({ theme: t }) => t.color.primary500};
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
`;
export const Content = styled.div`
  flex-grow: 1;
  font-weight: 500;
  font-size: 16px;
`;
export const StyledCancelIcon = styled(CancelIcon)`
  fill: ${({ theme: t }) => t.color.primary500};
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
