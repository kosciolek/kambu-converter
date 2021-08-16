import { css, Global } from "@emotion/react";
import { AppTheme } from "../theme";

const styles = (theme: AppTheme) => css`
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
    color: ${theme.color.primary700};
  }

  html {
    min-height: 100%;
  }

  html,
  body,
  #root {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
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
  
  /* Scrollbar */
  body::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px ${theme.color.primary900}11;
    background-color: ${theme.color.primary50};
  }

  body::-webkit-scrollbar {
    width: 10px;
    background-color: ${theme.color.primary100};
  }

  body::-webkit-scrollbar-thumb {
    background-color: ${theme.color.primary700};
  }
`;

export const GlobalStyles = () => <Global styles={styles} />;
