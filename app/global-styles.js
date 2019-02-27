import { createGlobalStyle } from 'styled-components';
import GothamBook from 'vendor/fonts/GothamBook.woff'

/* eslint no-unused-expressions: 0 */
const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: gotham-book;
    src: url(${GothamBook});
    font-weight: normal;
  }
  html,
  body {
    height: 100%;
    min-height: 100%;
    min-width: 335px;
    background-color: ${p => p.theme.backgroundColor};
  }

  body {
    font-family: gotham-book, "Segoe UI", Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: gotham-book, "Segoe UI", Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: ${p => p.theme.backgroundColor};
    min-width: 100%;
    min-height: 100%;
  }

  p,
  label {
    font-family: gotham-book, "Segoe UI", Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif;
    line-height: 1.5em;
  }

  text,
  input,
  a,
  button,
  select,
  label,
  div,
  svg {
    font-family: gotham-book, "Segoe UI", Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  input {
    font-family: gotham-book, "Segoe UI", Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
`;

export default GlobalStyle;
