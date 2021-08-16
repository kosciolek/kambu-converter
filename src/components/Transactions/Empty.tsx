import styled from "@emotion/styled/macro";

export const Empty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 0;
  color: ${({ theme: t }) => t.color.primary500};
`;
