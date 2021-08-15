import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ThemeColor } from "../../theme";

export const Txt = styled.span<{
  color?: ThemeColor;
  size?: TxtSize;
  weight?: number;
}>`
  color: ${(p) => p.color && p.theme.color[p.color]};

  font-size: ${(p) => p.size && fontSizes[p.size]};
  font-weight: ${(p) => p.weight};
`;

Txt.defaultProps = {
  size: "md",
};

export type TxtSize = "xs" | "sm" | "md" | "lg" | "xl";

/* TODO fluid scaling for xl? */
const fontSizes: Record<TxtSize, string | ReturnType<typeof css>> = {
  xs: "14px",
  sm: "16px",
  md: "20px",
  lg: "22px",
  xl: "32px",
};
