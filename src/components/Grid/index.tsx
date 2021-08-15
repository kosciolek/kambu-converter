import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { breakpoints, Breakpoints } from "../../style/breakpoints";

/* Bootstrap-like grid with negative margins. */

export const Grid = styled.div<
  {
    container?: boolean;
    item?: boolean;
    area?: string;
    spacing?: number | string;
  } & Partial<Record<keyof Breakpoints, number>>
>`
  grid-area: ${(p) => p.area};

  ${(p) =>
    p.spacing &&
    css`
      margin-left: calc(-1 * ${resolveSpacing(p.spacing)} / 2);
      margin-top: calc(-1 * ${resolveSpacing(p.spacing)} / 2);

      & > * {
        padding: calc(${resolveSpacing(p.spacing)} / 2);
      }
    `};

  ${(p) =>
    p.container &&
    css`
      display: grid;
      grid-template-columns: repeat(12, 1fr);
    `}

  ${(p) =>
    p.item &&
    Object.keys(breakpoints)
      .filter((size) => size in p)
      .map(
        (size) =>
          css`
            @media (min-width: ${breakpoints[
                size as keyof typeof breakpoints
              ]}px) {
              display: ${p[size as keyof typeof p] === 0 ? "none" : "block"};
              grid-column: span ${p[size as keyof typeof p]};
            }
          `
      )}
`;
Grid.defaultProps = {
  spacing: 0,
};

const resolveSpacing = (val?: string | number) =>
  val && typeof val === "number" ? `${val}px` : val;
