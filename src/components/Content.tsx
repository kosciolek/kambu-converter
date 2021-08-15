import styled from "@emotion/styled";
import { contentWidth } from "../style/const";

/**
 * Center and constraint content width.
 */
export const Content = styled.div`
  margin: 0 auto;
  max-width: ${contentWidth};
  width: 100%;
`;
