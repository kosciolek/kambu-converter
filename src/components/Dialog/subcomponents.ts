import styled from "@emotion/styled";

export const DialogTitle = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: ${({ theme: t }) => t.color.primary600};
  margin-bottom: 16px;
`;

export const DialogContent = styled.div``;

export const DialogActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
  & > * + * {
    margin-left: 24px;
  }
`;
