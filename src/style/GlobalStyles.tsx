import { css, Global } from "@emotion/react";
import { AppTheme } from "../theme";

const styles = (_theme: AppTheme) => css`
  *,
  :after,
  :before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: transparent;
  }

  body {
    font-size: 18px;
    font-family: "Nunito", sans-serif;
    line-height: 1.4;
    overflow-y: scroll;
  }

  input {
    appearance: none;
    background-color: #00000000;
    color: inherit;
    border-radius: 0;
    border: 0;
    font: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  /* Reset button */
  button {
    appearance: none;
    border: 0;
    background-color: transparent;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    font-size: inherit;
    font-family: inherit;
  }

  /* Margin resets button */
  html,
  body,
  p {
    margin: 0;
    padding: 0;
  }
`;

export const GlobalStyles = () => <Global styles={styles} />;
